import React from 'react';
import { shallow } from 'enzyme';
import reactCSSThemrAddon from '../react-css-themr-addon';

// eslint-disable-next-line react/prop-types
jest.mock('../containers/react-css-themr', () => ({ story }) => (
  <div>
    ReactCSSThemr
    {story}
  </div>
));

const story = () => (
  <div>Story</div>
);
const validThemes = {
  a: { c: 14 },
  b: { d: 16 }
};

describe('reactCSSThemrAddon', () => {
  it('validates themes and skip the addon if they are invalid', () => {
    const wrappedStory = reactCSSThemrAddon();
    const wrapper = shallow(wrappedStory(story));

    expect(wrapper.html()).toBe('<div>Story</div>');
  });

  it('validates themes and apply addon if they are valid', () => {
    const wrappedStory = reactCSSThemrAddon(validThemes);
    const wrapper = shallow(wrappedStory(story));

    expect(wrapper.html()).toBe('<div>ReactCSSThemr<div>Story</div></div>');
  });
});
