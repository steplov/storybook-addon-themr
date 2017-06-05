import React from 'react';
import { storiesOf } from '@storybook/react';
import { reactCSSThemr } from './../../src/';
import { ComponentsExample, themes } from '../components';


storiesOf('React toolbox #1', module)
  .addDecorator(reactCSSThemr(themes))
  .add('components', () => (
    <ComponentsExample />
  ));

storiesOf('React toolbox #2', module)
  .addDecorator(reactCSSThemr(themes))
  .add('components', () => (
    <ComponentsExample />
  ));
