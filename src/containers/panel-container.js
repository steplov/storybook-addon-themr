import React from 'react';
import PropTypes from 'prop-types';
import { EVENT_ID_INIT, EVENT_ID_DATA } from '../';
import ThemePanel from '../components/theme-panel';

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onInitChannel = this.onInitChannel.bind(this);
    this.onChangeTheme = this.onChangeTheme.bind(this);
    this.state = {
      isReady: false,
      themes: {}
    };

    this.props.channel.on(EVENT_ID_INIT, this.onInitChannel);
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.api.setQueryParams({
      currentTheme: nextState.currentTheme
    });

    this.props.channel.emit(EVENT_ID_DATA, {
      currentTheme: nextState.currentTheme
    });
  }

  componentWillUnmount() {
    this.props.channel.removeListener(EVENT_ID_INIT, this.onInitChannel);
  }

  onInitChannel({ themes, currentTheme }) {
    const queryTheme = this.props.api.getQueryParam('currentTheme');

    this.setState({
      themes,
      currentTheme: queryTheme && typeof themes[queryTheme] === 'object' ? queryTheme : currentTheme,
      isReady: true
    });
  }

  onChangeTheme(currentTheme) {
    this.setState({ currentTheme });
  }

  render() {
    const { isReady } = this.state;

    return isReady ?
      <ThemePanel
        onThemeChange={this.onChangeTheme}
        themes={this.state.themes}
        currentTheme={this.state.currentTheme}
      /> :
      null;
  }
}

PanelContainer.propTypes = {
  channel: PropTypes.shape({
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  }).isRequired,
  api: PropTypes.shape({
    getQueryParam: PropTypes.func.isRequired,
    setQueryParams: PropTypes.func.isRequired
  }).isRequired
};

export default PanelContainer;
