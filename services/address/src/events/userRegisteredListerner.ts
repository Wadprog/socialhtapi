import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserRegisteredEvent } from "@webvital/micro-common";

import app from '../app';

export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
    subject: Subjects.UserRegistered = Subjects.UserRegistered;
    queueGroupName = 'address-service';

    async onMessage(data: UserRegisteredEvent['data'], msg: Message): Promise<void> {
        const sequelize = app.get('sequelizeClient');
        await sequelize.models.User.findOrCreate({ where: { id: data.id } });
        console.log('User created');
        msg.ack();
    }
}