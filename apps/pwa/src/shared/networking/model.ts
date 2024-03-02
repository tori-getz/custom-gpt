import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local';

export const $accessToken = createStore<string>('');

export const setAccessToken = createEvent<string>('set access token');

$accessToken.on(setAccessToken, (_, accessToken) => accessToken);

persist({ store: $accessToken, key: '@customgpt/accessToken' });
