import { HookContext } from "@feathersjs/feathers";
import { natsWrapper, UserInterface } from '@webvital/micro-common';

import { PasswordChange } from '../../../events/passwordChange'

export default (context: HookContext<UserInterface>): HookContext => {
    const { result } = context;
    if (!result) {
        return context;
    }
    new PasswordChange(natsWrapper.client).publish(result);
    return context;
}