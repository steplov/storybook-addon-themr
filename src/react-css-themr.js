import React from 'react';
import addons from '@storybook/addons';
import ReactCSSThemr from './containers/react-css-themr';

function validateThemes(themes) {
  const isThemeValid = theme => typeof theme.name === 'string' && typeof theme.styles === 'object';
  let isValid = false;

  if (
    themes &&
    themes.length &&
    themes.filter(isThemeValid)
  ) {
    isValid = true;
  }

  return isValid;
}

function reactCSSThemrAddon(themes = []) {
  const channel = addons.getChannel();
  const isThemeInvalid = !validateThemes(themes);

  return story => (
    isThemeInvalid ?
      story() :
      <ReactCSSThemr
        themes={themes}
        channel={channel}
        story={story()}
      />
  );
}

export default reactCSSThemrAddon;
