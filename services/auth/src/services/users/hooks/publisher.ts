import { HookContext } from "@feathersjs/feathers";
import { natsWrapper, UserInterface } from '@webvital/micro-common';

import { UserRegisteredPublisher } from '../../../events/userRegistered';

export default (context: HookContext<UserInterface>): HookContext => {
    const { result } = context;
    if (!result) {
        return context;
    }
    new UserRegisteredPublisher(natsWrapper.client).publish(result);
    return context;
}