import { jest } from '@jest/globals';

jest.mock('@webvital/micro-common', () => {
    const actual = jest.requireActual('@webvital/micro-common');
    return {
        __esModule: true,
        //@ts-expect-error
        ...actual,
        natsWrapper: {
            client: { publish: jest.fn() },
        },
    };
});
