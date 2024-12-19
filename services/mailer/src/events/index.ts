import { natsWrapper } from "@webvital/micro-common";

import { UserDeletedListener } from "./userDeletedListerners";
import { EmailVerifiedListener } from './emailVerifedListener';
import { PasswordResetListerner } from './passwordResetListener';
import { UserRegisteredListener } from './userRegisteredListerner';
import { PasswordChangeListerner } from './passwordChangedListener';

const Logger = console;

export default () => {
    const listeners = [
        UserDeletedListener,
        EmailVerifiedListener,
        PasswordResetListerner,
        UserRegisteredListener,
        PasswordChangeListerner
    ];

    try {
        listeners.forEach((listener) => {
            new listener(natsWrapper.client).listen();
        });
    } catch (error) {

        Logger.error('Listener threw an error', error);
    }
}
