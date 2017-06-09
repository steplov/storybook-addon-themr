# Storybook Themr addon

[![CircleCI](https://img.shields.io/circleci/project/github/steplov/storybook-addon-themr/master.svg)](https://circleci.com/gh/steplov/storybook-addon-themr/tree/master)
[![npm](https://img.shields.io/npm/v/storybook-addon-themr.svg)](https://www.npmjs.com/package/storybook-addon-themr)

## Getting Started

First, install the addon

```sh
npm install -D storybook-addon-themr
```

Add this line to your `addons.js` file (create this file inside your storybook config directory if needed).

```js
import 'storybook-addon-themr/register';
```

Now add your themes to stories

```js
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { reactCSSThemr } from 'storybook-addon-themr';

const themes = {
  'theme no. 1': {...theme1},
  'theme no. 2': {...theme2}
};

storiesOf('Story', module)
  .addDecorator(reactCSSThemr(themes))
  .add('components', () => (
    <Components />
  ));
```

### P.S. any feedback is appreciated