import { Subjects, PasswordChanged, Publisher } from '@webvital/micro-common';

export class PasswordChange extends Publisher<PasswordChanged> {
    subject: Subjects.PasswordChanged = Subjects.PasswordChanged;
}