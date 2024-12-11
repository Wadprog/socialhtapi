import app from '../app';
import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserRegisteredEvent } from "@webvital/micro-common";
import { first } from 'lodash';

export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName = 'address-service';

    async onMessage(data: UserRegisteredEvent['data'], msg: Message): Promise<void> {
        console.log('Event received!');
        const sequelize = app.get('sequelizeClient');
        const User = sequelize.models.User;
        await User.create({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
        });
        console.log('Registered User Saved!');
        msg.ack();
    }
}