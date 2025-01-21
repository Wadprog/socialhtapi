import { HookContext } from "@feathersjs/feathers";
import { natsWrapper, UserInterface } from '@webvital/micro-common';

import { UserEmailVerified } from '../../../events/userEmailVerified'

export default (context: HookContext<UserInterface>): HookContext => {
    const { result } = context;
    if (!result) {
        return context;
    }
    try {
        new UserEmailVerified(natsWrapper.client).publish(result);
    }
    catch (r) {
        console.log(r)
    }
    return context;
}