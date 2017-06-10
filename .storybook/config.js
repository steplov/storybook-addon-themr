import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'react-storybook-addon-themr',
  url: 'https://github.com/steplov/react-storybook-addon-themr'
});

storybook.configure(() => require('./../example/stories/'), module);