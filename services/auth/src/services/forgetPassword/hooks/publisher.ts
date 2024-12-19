import { HookContext } from "@feathersjs/feathers";
import { natsWrapper } from '@webvital/micro-common';

import { PasswordReset } from '../../../events/passwordReset'

interface AuthInterface {
    userId: number;
    passwordResetKey: string;
    passwordResetExpires: Date;
}
export default (context: HookContext<AuthInterface>): HookContext => {
    const { result } = context;
    if (!result) {
        return context;
    }
    new PasswordReset(natsWrapper.client).publish(result);
    return context;
}