import { HookContext } from "@feathersjs/feathers";
import { natsWrapper, UserInterface } from '@webvital/micro-common';

import { ProfileCreatedPublisher } from '../../../events/profileCreated';

export default (context: HookContext<UserInterface>): HookContext => {
    const { result } = context;
    if (!result) {
        return context;
    }
    new ProfileCreatedPublisher(natsWrapper.client).publish(result);
    return context;
}