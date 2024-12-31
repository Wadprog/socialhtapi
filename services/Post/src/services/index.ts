import { Application } from '../declarations';
/** Local dependencies */
import post from './posts/posts.service';
import korem from './korem/korem.service';
import comments from './comments/comments.service';


export default function (app: Application): void {
  app.configure(post);
  app.configure(korem);
  app.configure(comments);
}
