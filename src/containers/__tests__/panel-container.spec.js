import React from 'react';
import { shallow } from 'enzyme';
import PanelContainer from '../panel-container';
import { EVENT_ID_INIT, EVENT_ID_DATA } from '../../index';

jest.mock('../../components/theme-panel', () => () => (<div>a</div>));

const noop = () => {};

describe('<PanelContainer />', () => {
  it('should render empty without props', () => {
    const wrapper = shallow(
      <PanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams: noop
        }}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it(`should subcribe on ${EVENT_ID_INIT} event`, () => {
    const on = jest.fn();
    const onInitChannel = jest.fn().mockReturnValue(42);

    class MockedPanelContainer extends PanelContainer {
// eslint-disable-next-line class-methods-use-this
      onInitChannel() {}
    }

    MockedPanelContainer.prototype.onInitChannel = onInitChannel;

    shallow(
      <MockedPanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams: noop
        }}
        channel={{
          emit: noop,
          on,
          removeListener: noop
        }}
      />
    );

    expect(on).toHaveBeenCalled();
    expect(on.mock.calls[0][0]).toBe(EVENT_ID_INIT);
    expect(on.mock.calls[0][1]()).toBe(42);
  });

  it('should set current theme into query params', () => {
    const setQueryParams = jest.fn();
    const wrapper = shallow(
      <PanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams
        }}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
      />
    );

    wrapper.setState({ currentTheme: 'yolo' });

    expect(setQueryParams).toHaveBeenCalledWith({ currentTheme: 'yolo' });
  });

  it(`should emit ${EVENT_ID_DATA} event with current theme`, () => {
    const emit = jest.fn();
    const wrapper = shallow(
      <PanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams: noop
        }}
        channel={{
          emit,
          on: noop,
          removeListener: noop
        }}
      />
    );

    wrapper.setState({ currentTheme: 'yolo' });

    expect(emit).toHaveBeenCalledWith(EVENT_ID_DATA, { currentTheme: 'yolo' });
  });

  it(`should unsubcribe from ${EVENT_ID_INIT} event`, () => {
    const removeListener = jest.fn();
    const onInitChannel = jest.fn();
    const wrapper = shallow(
      <PanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams: noop
        }}
        channel={{
          emit: noop,
          on: noop,
          removeListener
        }}
      />
    );

    wrapper.instance().onInitChannel = onInitChannel;
    wrapper.unmount();

    expect(removeListener).toHaveBeenCalledWith(EVENT_ID_INIT, onInitChannel);
  });

  describe('onInitChannel', () => {
    const themes = {
      'theme 1': { a: 12, b: 13 },
      'theme 2': { c: 22, d: 33 }
    };
    const getQueryParam = jest.fn();
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <PanelContainer
          api={{
            getQueryParam,
            setQueryParams: noop
          }}
          channel={{
            emit: noop,
            on: noop,
            removeListener: noop
          }}
        />
      );
    });

    it('should set current theme from query to state if it exists', () => {
      getQueryParam.mockReturnValue('theme 2');

      wrapper.instance().onInitChannel({ themes, currentTheme: 'theme 1' });

      expect(wrapper.state('currentTheme')).toBe('theme 2');
    });

    it('should set current theme from properties to state', () => {
      getQueryParam.mockReturnValue('theme 42');

      wrapper.instance().onInitChannel({ themes, currentTheme: 'theme 1' });

      expect(wrapper.state('currentTheme')).toBe('theme 1');
    });

    it('should mark that component is ready to show data', () => {
      wrapper.instance().onInitChannel({ themes, currentTheme: 'theme 1' });
      expect(wrapper.state('isReady')).toBe(true);
    });

    it('should set themes to state', () => {
      wrapper.instance().onInitChannel({ themes, currentTheme: 'theme 1' });
      expect(wrapper.state('themes')).toEqual(themes);
    });
  });

  it('should handle theme changing', () => {
    const wrapper = shallow(
      <PanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams: noop
        }}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
      />
    );

    wrapper.instance().onChangeTheme(42);

    expect(wrapper.state('currentTheme')).toBe(42);
  });

  it('renders nothing if there are no data', () => {
    const wrapper = shallow(
      <PanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams: noop
        }}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
      />
    );

    expect(wrapper.html()).toBe(null);
  });

  it('renders nothing if there are no data', () => {
    const wrapper = shallow(
      <PanelContainer
        api={{
          getQueryParam: noop,
          setQueryParams: noop
        }}
        channel={{
          emit: noop,
          on: noop,
          removeListener: noop
        }}
      />
    );

    wrapper.setState({
      themes: {
        a: 42,
        b: 13
      },
      currentTheme: 'a',
      isReady: true
    });

    expect(wrapper.html()).toBe('<div>a</div>');
  });
});
