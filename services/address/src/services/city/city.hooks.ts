import { disablePagination, disallow } from 'feathers-hooks-common';
import OrderBy from '../../hooks/orderBy.hooks';
import { CityInterface } from '@webvital/micro-common';

const notAllow = disallow('external');
export default {
  before: {
    find: [disablePagination(), OrderBy<CityInterface>({ name: 1 })],
    get: notAllow,
    create: notAllow,
    update: notAllow,
    patch: notAllow,
    remove: notAllow,
  },
};


