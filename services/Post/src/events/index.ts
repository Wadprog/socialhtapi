import { natsWrapper } from "@webvital/micro-common";


import { UserDeletedListener } from './userDeletedListerners';
import { ProfileCreatedListener } from './profileCreatedListener';

const Logger = console;
export default () => {
    const listeners = [UserDeletedListener, ProfileCreatedListener];
    try {
        listeners.forEach((listener) => {
            new listener(natsWrapper.client).listen();
        });
    } catch (error) {
        Logger.error('Listener threw an error', error);
    }
}
