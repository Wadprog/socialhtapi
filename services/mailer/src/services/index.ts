import users from './users/users.service';
import { Application } from '../declarations';
import template from './template/template.service';


export default function (app: Application): void {

  app.configure(users);
  app.configure(template);

}
