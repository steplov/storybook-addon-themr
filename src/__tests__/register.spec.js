/* eslint-disable global-require */
import { register, addPanel } from '@storybook/addons';
import { ADDON_ID, PANEL_ID } from '../index';

jest.mock('@storybook/addons', () => ({
  register: jest.fn().mockImplementation((addonId, callback) => callback()),
  getChannel: jest.fn(),
  addPanel: jest.fn()
}));

describe('register', () => {
  it(`registers addon with ${ADDON_ID} id`, () => {
    require('../register');

    expect(register).toHaveBeenCalled();
    expect(register.mock.calls[0][0]).toBe(ADDON_ID);
  });

  it(`registers panel with ${PANEL_ID} id`, () => {
    require('../register');

    expect(addPanel).toHaveBeenCalled();
    expect(addPanel.mock.calls[0][0]).toBe(PANEL_ID);
    expect(addPanel.mock.calls[0][1].title).toBe('React CSS Themr');
  });
});
