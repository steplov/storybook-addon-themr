import React from 'react';
import { shallow } from 'enzyme';
import ThemePanel from '../theme-panel';

const themes = {
  a: {
    a: 'a',
    b: 'b'
  },
  c: {
    d: 'd',
    e: 'e'
  }
};

describe('<ThemePanel />', () => {
  it('should render empty without props', () => {
    const wrapper = shallow(<ThemePanel />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders themes', () => {
    const wrapper = shallow(
      <ThemePanel themes={themes} />
    );
    const options = wrapper.find('option');

    expect(options.get(0).props.value).toBe('a');
    expect(options.get(0).props.children).toBe('a');
    expect(options.get(1).props.value).toBe('c');
    expect(options.get(1).props.children).toBe('c');
  });

  it('renders selected theme', () => {
    const wrapper = shallow(
      <ThemePanel
        themes={themes}
        currentTheme="c"
      />
    );
    const select = wrapper.find('select');

    expect(select.props().value).toBe('c');
  });

  it('handles theme change', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <ThemePanel
        themes={themes}
        onThemeChange={onChange}
      />
    );
    const select = wrapper.find('select');

    select.simulate('change', { target: { value: 'c' } });

    expect(onChange).toHaveBeenCalledWith('c');
  });
});
