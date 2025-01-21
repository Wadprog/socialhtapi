// import isEmpty from 'lodash/isEmpty';
import { Op } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';
import { sequelizeWrapper } from '@webvital/micro-common';

import UserAttributes from '../../../utils/usersAtributes'
import { amountOfComments, amountOfKorems, isReactor, reactors, CanDelete } from './sqlHelper'

export default (context: HookContext): HookContext => {

  const { params } = context;
  const Sequelize = sequelizeWrapper.client;

  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  const single = context.method === 'get';
  const queryString = {
    PostId: null,
    ...where,
    [Op.and]: {
      [Op.or]: [
        { privacyType: 'public' },
        { user_id: params.user.id },
      ],
    },
  };

  const clause = single ? { id: context.id } : queryString;

  params.sequelize = {
    logging: console.log,
    where: clause,
    attributes: {
      include: [
        [Sequelize.literal(amountOfComments), 'amountOfComments'],
        [Sequelize.literal(amountOfKorems), 'amountOfKorems'],
        [Sequelize.literal(isReactor(params.user.id)), 'isReactor'],
        [Sequelize.literal(reactors), 'reactors'],
        [Sequelize.literal(CanDelete(params.user.id)), 'canDelete'],
      ],
      exclude: [],
    },

    include: [

      {
        model: Sequelize.models.User,
        attributes: UserAttributes,
        required: true,
      },
      {
        model: Sequelize.models.Community,
      },
      {
        model: Sequelize.models.Media,
      },
    ],
    raw: false,
  };

  return context;
};
