import { Factory } from '../config/ConfigLog4j';
import * as Promise from 'bluebird';
import * as Redis from 'redis';

declare module 'redis' {
    export interface RedisClient extends NodeJS.EventEmitter {
        getAsync(...args: any[]): Promise<any>;
    }
}

const unpromisedClient = Redis.createClient();
export const MyRedisClient = Promise.promisifyAll(unpromisedClient) as Redis.RedisClient;

const logger = Factory.getLogger('RedisClientLogger');

MyRedisClient.on('ready', () => {
    logger.info(() => 'Successfully connected to REDIS and currently READY');
});

MyRedisClient.on('error', () => {
    logger.error(() => 'REDIS has error');
});
