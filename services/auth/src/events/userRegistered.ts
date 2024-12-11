import { Subjects, UserRegisteredEvent, Publisher } from '@webvital/micro-common';

export class UserRegisteredPublisher extends Publisher<UserRegisteredEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
}