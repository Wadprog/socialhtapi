/* eslint-disable no-unused-vars */
import { isNil } from 'lodash';
import { BadRequest } from '@feathersjs/errors';
import { Subjects, Publisher, natsWrapper, UserInterface } from '@webvital/micro-common';

import app from '../app';

interface UserVefiedEmail {
  subject: Subjects.UserCreated;
  data: {
    email: string;
  };
}

class UserVerifiedEmailPublisher extends Publisher<UserVefiedEmail> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
export async function verifyEmail(
  query: Pick<UserInterface, 'emailVerificationkey'>,
  userId: Pick<UserInterface, 'id'>,
) {
  const { User } = app.get('sequelizeClient').models;
  const user = await User.findByPk(userId);

  if (isNil(user))
    throw new BadRequest('User not found');

  // check if the verification key is expired 
  if (user.verifyExpires < Date.now())
    throw new BadRequest('Verification key expired, request a new one');

  if (user.emailVerificationkey !== query)
    throw new BadRequest('Invalid verification key');

  user.emailVerified = true;
  user.emailVerificationKey = null;
  user.verifyExpires = null;
  await user.save();
  new UserVerifiedEmailPublisher(natsWrapper.client).publish({ email: user.email });

}
