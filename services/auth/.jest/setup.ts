import { beforeAll, afterAll } from '@jest/globals';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';

let container: StartedPostgreSqlContainer;

beforeAll(async () => {

  try {
    execSync('docker ps -a --filter "name=test-postgres" --format "{{.Names}}" | grep -w test-postgres');
  } catch (error) {
    execSync('docker run --name test-postgres -e POSTGRES_DB=auth -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:12');
  }

  process.env.NODE_ENV = 'development'



}, 20000);

afterAll(async () => {
  console.log('The connection will remain open for now')
});


// export default async function (globalConfig, projectConfig) {
//   const sequelize = app.get('sequelizeClient');
//   // await sequelize.sync();
//   console.log('Sequelize synced!');

//   globalThis.__SEQUELIZE__ = sequelize;
// }


