import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

/** Local dependencies */
import common from '../../utils/common';
import { Application } from '../../declarations';
import { include } from '../../utils/commentPostInclude';

const {getUploadedFiles} = common;

export class Posts extends Service {
  app;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  // async create(data:any, params: Params) {
  //   const postData = getUploadedFiles(['postImage', 'postVideo'], data);
  //   const post = await this.app
  //     .service('posts')
  //     .Model.create(postData, { include: include(this.app) });

  //   return Promise.resolve(post);
  // }

}
