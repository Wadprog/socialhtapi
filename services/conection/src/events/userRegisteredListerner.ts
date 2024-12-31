
import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserRegisteredEvent } from "@webvital/micro-common";

import app from '../app';


export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
    subject: Subjects.UserRegistered = Subjects.UserRegistered;
    queueGroupName = 'connection-service';

    async onMessage(data: UserRegisteredEvent['data'], msg: Message): Promise<void> {
        const sequelize = app.get('sequelizeClient');
        try {
            await sequelize.models.User.findOrCreate({
                where: {
                    id: data.id
                }, defaults: data

            });
            console.log('User created');
            msg.ack();
        } catch (err) {
            console.log('could not register new user \n\n**********\n\n');
            console.log(err);
        }

    }
}