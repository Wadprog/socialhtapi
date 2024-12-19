import { natsWrapper } from "@webvital/micro-common";


import { UserDeletedListener } from './userDeletedListerners';
import { UserRegisteredListener } from './userRegisteredListerner';

const Logger = console;
export default () => {
    const listeners = [UserDeletedListener, UserRegisteredListener];
    try {
        listeners.forEach((listener) => {
            new listener(natsWrapper.client).listen();
        });
    } catch (error) {
        Logger.error('Listener threw an error', error);
    }
}
