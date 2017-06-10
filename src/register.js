import React from 'react';
import { register, getChannel, addPanel } from '@storybook/addons';
import PanelContainer from './containers/panel-container';
import { ADDON_ID, PANEL_ID } from './index';

register(ADDON_ID, (api) => {
  const channel = getChannel();

  addPanel(PANEL_ID, {
    title: 'React CSS Themr',
    render: () => <PanelContainer channel={channel} api={api} />
  });
});
