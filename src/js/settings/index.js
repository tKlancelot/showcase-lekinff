import { addSetting } from './addSetting.js';
import { editSetting } from './editSetting.js';
import { fetchSettings } from './fetchSettings.js';
import { removeSetting } from './removeSetting.js';

export const initSettings = () => {
  fetchSettings();
  addSetting();
  editSetting();
  removeSetting();
};