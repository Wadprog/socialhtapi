import { Subjects, UserDeletedEvent, Publisher } from '@webvital/micro-common';

export class UserDeletedPublisher extends Publisher<UserDeletedEvent> {
    subject: Subjects.UserDeleted = Subjects.UserDeleted;
}