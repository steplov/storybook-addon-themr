import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-css-themr';
import { EVENT_ID_INIT, EVENT_ID_DATA } from '../';

class ReactCSSThemr extends React.Component {
  constructor(props) {
    super(props);

    this.onReceiveData = this.onReceiveData.bind(this);
    this.state = {
      currentTheme: props.themes[0].name,
      isReady: false
    };
  }

  componentDidMount() {
    this.props.channel.emit(EVENT_ID_INIT, {
      themes: this.props.themes,
      currentTheme: this.state.currentTheme
    });
    this.props.channel.on(EVENT_ID_DATA, this.onReceiveData);
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

  getTheme(theme) {
    return this.props.themes.filter(({ name: n }) => n === theme)[0];
  }

  render() {
    const { story } = this.props;
    const { currentTheme, isReady } = this.state;
    const { name, styles } = this.getTheme(currentTheme);

    return (
      isReady ?
        <ThemeProvider
          key={name}
          theme={styles}
        >
          {story}
        </ThemeProvider> :
        story
    );
  }
}

ReactCSSThemr.propTypes = {
  themes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired
  })).isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  }).isRequired,
  story: PropTypes.node.isRequired
};

export default ReactCSSThemr;
