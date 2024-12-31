import { Subjects, EmailVerifiedEvent, Publisher } from '@webvital/micro-common';

export class UserEmailVerified extends Publisher<EmailVerifiedEvent> {
    subject: Subjects.EmailVerified = Subjects.EmailVerified;
}