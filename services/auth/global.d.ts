// // global.d.ts
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

declare global {
    // Extend the NodeJS Global interface
    namespace NodeJS {
        interface Global {
            __POSTGRES_CONTAINER__?: StartedPostgreSqlContainer;
        }
    }
}

export { };


// import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

// declare module NodeJS {
//     interface Global {
//         __POSTGRES_CONTAINER__?: StartedPostgreSqlContainer;
//     }
// }

// export { };