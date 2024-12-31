import { Message } from 'node-nats-streaming';
import { Subjects, Listener, PasswordChanged } from "@webvital/micro-common";

import app from '../app';
// import { messenger } from '../libs';
import { renderTemplate } from '../libs/templateParser';
import { isNil } from 'lodash';

const Logger = console

export class PasswordChangeListerner extends Listener<PasswordChanged> {
    subject: Subjects.PasswordChanged = Subjects.PasswordChanged;
    queueGroupName = 'mailer-service';

    async onMessage(data: PasswordChanged['data'], msg: Message): Promise<void> {
        const sequelize = app.get('sequelizeClient');

        const user = await sequelize.models.User.findOne({
            where: { id: data.id }
        });

        if (isNil(user)) {
            Logger.error('User not found');
            return;
        }

        const template = await sequelize.models.Template.findOne({
            where: { name: 'PSW_CHNG'},
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