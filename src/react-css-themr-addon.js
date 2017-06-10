import React from 'react';
import addons from '@storybook/addons';
import ReactCSSThemr from './containers/react-css-themr';

function validateThemes(themes) {
  let isValid = false;

  if (Object.keys(themes).filter(key => typeof themes[key] === 'object').length) {
    isValid = true;
  }

  return isValid;
}

function reactCSSThemrAddon(themes = {}) {
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
