import React from 'react';
import { storiesOf } from '@storybook/react';
import { reactCSSThemr } from './../../src/';
import { ComponentsExample, ComponentsExample2, themes } from '../components';

storiesOf('React toolbox example #1', module)
  .addDecorator(reactCSSThemr(themes))
  .add('components', () => (
    <ComponentsExample />
  ));

storiesOf('React toolbox example #2', module)
  .addDecorator(reactCSSThemr(themes))
  .add('components', () => (
    <ComponentsExample2 />
  ));
