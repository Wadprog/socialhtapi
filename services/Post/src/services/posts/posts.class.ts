import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { sequelizeWrapper } from '@webvital/micro-common';
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

  async create(data:any, params: Params) {
    const postData = getUploadedFiles(['postImage', 'postVideo'], data);
    console.log(' post Data', postData);
    const post = await sequelizeWrapper.client.models.Post.create(postData);

    return Promise.resolve(post);
  }

}
