import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-css-themr';
import { EVENT_ID_INIT, EVENT_ID_DATA } from '../';

class ReactCSSThemr extends React.Component {
  constructor(props) {
    super(props);

    this.onReceiveData = this.onReceiveData.bind(this);
    this.state = {
      currentTheme: Object.keys(props.themes)[0],
      isReady: false
    };

    this.props.channel.on(EVENT_ID_DATA, this.onReceiveData);
    this.props.channel.emit(EVENT_ID_INIT, {
      themes: this.props.themes,
      currentTheme: this.state.currentTheme
    });
  }

  componentWillUnmount() {
    this.props.channel.removeListener(EVENT_ID_DATA, this.onReceiveData);
  }

  onReceiveData(data) {
    this.setState({
      isReady: true,
      currentTheme: data.currentTheme
    });
  }

  render() {
    const { story, themes } = this.props;
    const { currentTheme, isReady } = this.state;

    return (
      isReady ?
        <ThemeProvider
          key={currentTheme}
          theme={themes[currentTheme]}
        >
          {story}
        </ThemeProvider> :
        story
    );
  }
}

ReactCSSThemr.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  themes: PropTypes.object.isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  }).isRequired,
  story: PropTypes.node.isRequired
};

export default ReactCSSThemr;
