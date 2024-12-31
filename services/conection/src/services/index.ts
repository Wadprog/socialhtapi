import { Application } from '../declarations';
/** Local dependencies */

import users from './users/users.service';
// import friend from './friends/friends.service';
// import followers from './followers/followers.service';
// import userVisitors from './userVisitors/user-visitors.service';
// import friendRequest from './friendRequest/friendRequests.service';
// import undesiredFriend from './undesiredFriends/undesiredFriends.service';

export default function (app: Application): void {
  app.configure(users);
  // app.configure(friend);
  // app.configure(followers);
  // app.configure(userVisitors);
  // app.configure(friendRequest);
  // app.configure(undesiredFriend);
}
