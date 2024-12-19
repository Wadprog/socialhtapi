import { Subjects, PasswordResetEvent, Publisher } from '@webvital/micro-common';

export class PasswordReset extends Publisher<PasswordResetEvent> {
    subject: Subjects.PasswordReset = Subjects.PasswordReset;
}