import users from './users/users.service';
import { Application } from '../declarations';


export default function (app: Application): void {

  app.configure(users);

}
