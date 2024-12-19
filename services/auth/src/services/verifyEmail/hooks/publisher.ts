import { HookContext } from "@feathersjs/feathers";
import { natsWrapper, UserInterface } from '@webvital/micro-common';

import { UserEmailVerified} from '../../../events/userEmailVerified'

export default (context: HookContext<UserInterface>): HookContext => {
    const { result } = context;
    if (!result) {
        return context;
    }
    new UserEmailVerified(natsWrapper.client).publish(result);
    return context;
}