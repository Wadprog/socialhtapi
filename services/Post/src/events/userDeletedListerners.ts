import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserDeletedEvent, sequelizeWrapper } from "@webvital/micro-common";


export class UserDeletedListener extends Listener<UserDeletedEvent> {
    subject: Subjects.UserDeleted = Subjects.UserDeleted;
    queueGroupName = 'post-service';

    async onMessage(data: UserDeletedEvent['data'], msg: Message): Promise<void> {
        const sequelize = sequelizeWrapper.client
        await sequelize.models.User.destroy({ where: { id: data } });
        console.log('User deleted');
        msg.ack();
    }
}