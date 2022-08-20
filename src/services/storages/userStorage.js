import createStorage from './createStorage';

const instance = createStorage('user');
const KEY_PROFILE = 'user';
const KEY_TOKEN = 'token';
const KEY_EMAIL = 'username';

export const setProfile = (data) => instance.setValue(KEY_PROFILE, data);

export const setProfileLists = (data) => instance.setlistValue(data);

export const getValueUser = (key) => instance.getValue(key);

export const getProfile = () => instance.getValue(KEY_PROFILE);

export const setToken = (data) => instance.setValue(KEY_TOKEN, data);

export const getToken = () => instance.getValue(KEY_TOKEN);

export const clearToken = () => instance.clear();

export const getEmail = () => instance.getValue(KEY_EMAIL);

export const setEmail = (data) => instance.setValue(KEY_EMAIL, data);
