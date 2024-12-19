import users from './users/users.service';
import verifyEmail from './verifyEmail/verifyEmail.service';
import forgetPassword from './forgetPassword/forgetPassword.service';
import passwordChange from './passwordChange/passwordChange.service';

import { Application } from '../declarations';


export default function (app: Application): void {

  app.configure(users);
  app.configure(verifyEmail);
  app.configure(forgetPassword);
  app.configure(passwordChange);

}
