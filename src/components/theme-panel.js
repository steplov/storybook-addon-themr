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
    const currentThemeStyles = themes.filter(({ name }) => name === currentTheme)[0].styles;

    return (
      <div style={styles.panel} >
        <div style={styles.leftColumn} >
          <select
            onChange={this.handleChange}
            style={styles.select}
          >
            {
              themes.map(theme => (
                <option
                  key={theme.name}
                  value={theme.name}
                  selected={theme.name === currentTheme}
                >
                  {theme.name}
                </option>
              ))
            }
          </select>
        </div>
        <div style={styles.rightColumn}>
          {ThemePanel.renderThemeStyles(currentThemeStyles)}
        </div>
      </div>
    );
  }
}

ThemePanel.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
  themes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired
  })).isRequired,
  currentTheme: PropTypes.string.isRequired
};

export default ThemePanel;
