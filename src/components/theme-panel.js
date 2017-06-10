import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

class ThemePanel extends React.Component {
  static renderThemeStyles(currentThemeStyles) {
    return (
      // eslint-disable-next-line react/no-danger
      <div dangerouslySetInnerHTML={{
        __html: JSON.stringify(currentThemeStyles, null, 2)
      }}
      />
    );
  }

  constructor(...props) {
    super(...props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onThemeChange(e.target.value);
  }

  render() {
    const { currentTheme, themes } = this.props;

    return (
      <div style={styles.panel} >
        <div style={styles.leftColumn} >
          <select
            onChange={this.handleChange}
            style={styles.select}
            value={currentTheme}
          >
            {
              Object.keys(themes).map(theme => (
                <option
                  key={theme}
                  value={theme}
                >
                  {theme}
                </option>
              ))
            }
          </select>
        </div>
        <div style={styles.rightColumn}>
          {
            themes[currentTheme] &&
              ThemePanel.renderThemeStyles(themes[currentTheme])
          }
        </div>
      </div>
    );
  }
}

ThemePanel.propTypes = {
  onThemeChange: PropTypes.func,
// eslint-disable-next-line react/forbid-prop-types
  themes: PropTypes.object,
  currentTheme: PropTypes.string
};

ThemePanel.defaultProps = {
  onThemeChange: () => {},
  themes: {},
  currentTheme: ''
};

export default ThemePanel;
