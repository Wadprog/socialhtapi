import { HookContext } from "@feathersjs/feathers";
import { natsWrapper } from '@webvital/micro-common';
import hasIn from 'lodash/hasIn'

import { PasswordReset } from '../../../events/passwordReset'

interface AuthInterface {
    userId: number;
    passwordResetKey: string;
    passwordResetExpires: Date;
}
export default (context: HookContext<AuthInterface>): HookContext => {
    const { result } = context;
    if (!result || !hasIn(result, 'passwordResetKey')) return context;

    new PasswordReset(natsWrapper.client).publish(result);
    return context;
}