import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserDeletedEvent } from "@webvital/micro-common";

import app from '../app';

export class UserDeletedListener extends Listener<UserDeletedEvent> {
    subject: Subjects.UserDeleted = Subjects.UserDeleted;
    queueGroupName = 'address-service';

    async onMessage(data: UserDeletedEvent['data'], msg: Message): Promise<void> {
        const sequelize = app.get('sequelizeClient');
        // await sequelize.models.User.destroy({ where: { id: data } });
        console.log('User deleted');
        msg.ack();
    }
}