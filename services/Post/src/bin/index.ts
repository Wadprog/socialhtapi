
import app from '../app';
import helper from './sever_helper';
import Logger from '../utils/logger';
import startListeners from '../events'
import {natsWrapper} from '@webvital/micro-common'

console.log('Starting up... **post-service***');

if(!helper.envConfigurationCheck()){
  console.log('Environment variables are not set properly');

//   Logger.error('Environment variables are not set properly');
//   throw new Error('Environment variables are not set properly');
//   process.exit(1);
}

const port = 3000//helper.normalizePort(3000);


app.initialize({
  host: 'post-posgres-srv',
  dialect: 'postgres',
  database: 'post',
  username: 'postgres',
  password: 'postgres'
})

const server = app.server.listen(port);


server.on('error', (err) => {
  // helper.onError(err, /*API_CONFIGURATION.port*/ 3000);
  Logger.error(err);
});

server.on('listening', async () => {
 
  
  await natsWrapper.connect('ticketing', 'post-service', 'http://nats-srv:4222')
  startListeners()
  console.log(`Server listening on port ${port}`);
});