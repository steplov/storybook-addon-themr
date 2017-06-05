import React from 'react';
import addons from '@storybook/addons';
import PanelContainer from './containers/panel-container';
import { ADDON_ID, PANEL_ID } from './';

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel();

  addons.addPanel(PANEL_ID, {
    title: 'React CSS Themr',
    render: () => <PanelContainer channel={channel} api={api} />
  });
});
