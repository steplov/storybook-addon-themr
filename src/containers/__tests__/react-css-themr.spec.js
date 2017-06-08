/* eslint-disable class-methods-use-this,react/prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import ReactCssThemr from '../react-css-themr';
import { EVENT_ID_INIT, EVENT_ID_DATA } from '../../index';

jest.mock('react-css-themr', () => ({
  ThemeProvider: ({ children }) => (
    <div>
      ThemeProvider
      {children}
    </div>
  )
}));

const noop = () => {};
const story = () => (
  <div>Story</div>
);
const themes = {
  'theme 1': {
    a: 12,
    b: 13
  },
  theme2: {
    c: 14,
    d: 15
  },
  4: {
    e: 22,
    f: 33
  }
};

describe('<ReactCssThemr />', () => {
  it('should render empty without props', () => {
    const wrapper = shallow(
      <ReactCssThemr
        themes={themes}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
        story={story()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it(`should subcribe on ${EVENT_ID_DATA} event`, () => {
    class MockedReactCssThemr extends ReactCssThemr {
      onInitChannel() {}
    }

    const on = jest.fn();

    MockedReactCssThemr.prototype.onReceiveData = jest.fn().mockReturnValue(42);

    shallow(
      <MockedReactCssThemr
        themes={themes}
        channel={{
          emit: noop,
          on,
          removeListener: noop
        }}
        story={story()}
      />
    );

    expect(on).toHaveBeenCalled();
    expect(on.mock.calls[0][0]).toBe(EVENT_ID_DATA);
    expect(on.mock.calls[0][1]()).toBe(42);
  });

  it(`should emit ${EVENT_ID_INIT} event with current theme and themes`, () => {
    const emit = jest.fn();

    shallow(
      <ReactCssThemr
        themes={themes}
        channel={{
          emit,
          on: noop,
          removeListener: noop
        }}
        story={story()}
      />
    );

    expect(emit).toHaveBeenCalled();
    expect(emit.mock.calls[0][0]).toBe(EVENT_ID_INIT);
    expect(emit.mock.calls[0][1].themes).toEqual(themes);
    expect(emit.mock.calls[0][1].currentTheme).toBeTruthy();
  });

  it(`should unsubcribe from ${EVENT_ID_INIT} event`, () => {
    const removeListener = jest.fn();
    const onReceiveData = jest.fn();
    const wrapper = shallow(
      <ReactCssThemr
        themes={themes}
        channel={{
          emit: noop,
          on: noop,
          removeListener
        }}
        story={story()}
      />
    );

    wrapper.instance().onReceiveData = onReceiveData;
    wrapper.unmount();

    expect(removeListener).toHaveBeenCalledWith(EVENT_ID_DATA, onReceiveData);
  });

  describe('onReceiveData', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <ReactCssThemr
          themes={themes}
          channel={{
            emit: noop,
            on: noop,
            removeListener: noop
          }}
          story={story()}
        />
      );
    });

    it('should set current theme from query to state if it exists', () => {
      wrapper.instance().onReceiveData({ currentTheme: 'theme 1' });

      expect(wrapper.state('currentTheme')).toBe('theme 1');
    });

    it('should mark that component is ready to show data', () => {
      wrapper.instance().onReceiveData({ currentTheme: 'theme 1' });
      expect(wrapper.state('isReady')).toBe(true);
    });
  });

  it('renders story if addon cannot be applied', () => {
    const wrapper = shallow(
      <ReactCssThemr
        themes={themes}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
        story={story()}
      />
    );

    expect(wrapper.html()).toBe('<div>Story</div>');
  });

  it('renders wrapped story', () => {
    const wrapper = shallow(
      <ReactCssThemr
        themes={themes}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
        story={story()}
      />
    );

    wrapper.setState({
      isReady: true
    });

    expect(wrapper.html()).toBe('<div>ThemeProvider<div>Story</div></div>');
  });
});
