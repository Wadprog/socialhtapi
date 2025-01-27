import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProfileCreated, sequelizeWrapper } from "@webvital/micro-common";


export class ProfileCreatedListener extends Listener<ProfileCreated> {
    subject: Subjects.UserCreated
     = Subjects.UserCreated;
    queueGroupName = 'post-service';

    async onMessage(data: ProfileCreated['data'], msg: Message): Promise<void> {
        const sequelize = sequelizeWrapper.client
        await sequelize.models.User.findOrCreate({ where: { id: data.id } , defaults:{
            firstName: data.firstName,
            lasName:data.lastName,
            profilePicture:"https://plus.unsplash.com/premium_photo-1671656349076-0a8ebbb706fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZVBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
        }});
        console.log('User created');
        msg.ack();
    }
}