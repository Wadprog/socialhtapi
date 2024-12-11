import { Id } from '@feathersjs/feathers';
import { Sequelize } from 'sequelize';

import isMemberQuery from '../sql/ismember.sql';


export default (userId: Id, communityId: Id, sequelize: Sequelize) => {
  const query = isMemberQuery
    .replace(/:userId/g, userId as string)
    .replace(/:communityId/g, communityId as string);

  return sequelize.literal(query);
  // return sequelize.literal('true');
};
