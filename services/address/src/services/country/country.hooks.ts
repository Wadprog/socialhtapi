import { disallow } from 'feathers-hooks-common';
import OrderBy from '../../hooks/orderBy.hooks';

import { CountryInterface } from '@webvital/micro-common';


const notAllow = disallow('external');
export default {
  before: {
    find: [OrderBy<CountryInterface>({ name: 1 })],
    get: notAllow,
    create: notAllow,
    update: notAllow,
    patch: notAllow,
    remove: notAllow,
  },
};
