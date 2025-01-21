
import { HookContext } from "@feathersjs/feathers";
import { natsWrapper, UserInterface } from '@webvital/micro-common';

import { UserDeletedPublisher } from "../../../events/userDeleted";

export default (context: HookContext<UserInterface>): HookContext => {
    const { result } = context;
    if (!result) {
        return context;
    }
    // @ts-ignore
    new UserDeletedPublisher(natsWrapper.client).publish(result.id);
    return context;
}