import { natsWrapper } from '@webvital/micro-common';
import app from '../app';

// import {
//   ApiConfigurationType,
//   API_CONFIG_SCHEMA,
// } from '../schema/serverConf.schema';
import helper from './sever_helper';
import listeners from '../events';

// const API_CONFIGURATION: ApiConfigurationType = app.get('API_CONFIGURATION');

const port = 3000;
// if (API_CONFIG_SCHEMA.parse(API_CONFIGURATION)) {
// port = helper.normalizePort(3000)//API_CONFIGURATION.port);



const server = app.listen(port);


server.on('error', (err) => {
  helper.onError(err, /*API_CONFIGURATION.port*/ 3000);
});

server.on('listening', async () => {
  // helper.envConfigurationCheck();
  await natsWrapper.connect('ticketing', 'connection-service', 'http://nats-srv:4222')
  listeners();
  console.log(`Server listening on port ${port}`);
});
// }
