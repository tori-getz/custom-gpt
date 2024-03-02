import { createEvent, createStore } from "effector";

export const $menuOpened = createStore<boolean>(true);

export const setMenuOpened = createEvent<boolean>('set menu opened');

$menuOpened.on(setMenuOpened, (_, menuOpened) => menuOpened);
