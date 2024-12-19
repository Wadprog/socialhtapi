import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserRegisteredEvent } from "@webvital/micro-common";

import app from '../app';
// import { messenger } from '../libs';
import { renderTemplate } from '../libs/templateParser';
import { isNil } from 'lodash';

const Logger = console

export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
    subject: Subjects.UserRegistered = Subjects.UserRegistered;
    queueGroupName = 'mailer-service';

    async onMessage(data: UserRegisteredEvent['data'], msg: Message): Promise<void> {
        const sequelize = app.get('sequelizeClient');

        await sequelize.models.User.findOrCreate({
            where: {
                id: data.id,
            },
            defaults: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            }
        });

        const template = await sequelize.models.Template.findOne({
            where: {
                name: 'EML_VRF_KY',
            },
        });

        if (isNil(template)) {
            Logger.error('Template not found');
            return;
        }
        const html = renderTemplate(template.body, data);


        try {
            // await messenger.send(data.email, html, template.subject)
            Logger.info('Email sent successfully', html);
            await sequelize.models.SentLog.create({
                userId: data.id,
                templateId: template.id,
                sent: true
            });

        } catch (error) {
            Logger.error('Error sending email', error);
        }

        msg.ack();

    }
}