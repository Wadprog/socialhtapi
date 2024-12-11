import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserRegisteredEvent } from "@webvital/micro-common";

import app from '../app';
import { messenger } from '../libs';
import { renderTemplate } from '../libs/templateParser';

const Logger = console

export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName = 'mailer-service';

    async onMessage(data: UserRegisteredEvent['data'], msg: Message): Promise<void> {
        const sequelize = app.get('sequelizeClient');
        console.log('Event data!', data);

        await sequelize.models.User.create({
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
        });

        const template = await sequelize.models.Template.findOne({
            where: {
                name: 'EML_VRF_KY',
            },
        });

        const html = renderTemplate(template.body, { ...data, emailVerificationKey: data.emailVerificationkey });


        try {
            await messenger.send(data.email, html, template.subject)
            Logger.info('Email sent successfully');
            // await sequelize.models.SentLog.create({
            //     userId: data.id,
            //     templateId: template.id,
            //     sent: true
            // });

        } catch (error) {
            Logger.error('Error sending email');
        }

        msg.ack();

    }
}