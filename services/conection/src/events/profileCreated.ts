import { Subjects, ProfileCreated, Publisher } from '@webvital/micro-common';

export class ProfileCreatedPublisher extends Publisher<ProfileCreated> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
} 