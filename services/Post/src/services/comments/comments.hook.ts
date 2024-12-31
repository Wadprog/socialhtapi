import * as feathersAuthentication from '@feathersjs/authentication';

// import addAssociation from '../../Hooks/AddAssociations';
// import autoOwn from '../../Hooks/AutoOwn';
// import LimitToOwner from '../../Hooks/LimitToOwner';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    // find: [
    //   addAssociation({
    //     models: [
    //       {
    //         model: 'users',
    //         attributes: [
    //           'firstName',
    //           'lastName',
    //           'id',
    //           'profilePicture',
    //           'createdAt',
    //         ],
    //       },
    //     ],
    //   }),
    // ],
    // get: [
    //   authenticate('jwt'),
    //   addAssociation({
    //     models: [
    //       {
    //         model: 'users',
    //         attributes: [
    //           'firstName',
    //           'lastName',
    //           'id',
    //           'profilePicture',
    //           'createdAt',
    //         ],
    //       },
    //     ],
    //   }),
    // ],
    // create: [autoOwn],
    // update: [LimitToOwner],
    // patch: [LimitToOwner],
    // remove: [LimitToOwner],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
