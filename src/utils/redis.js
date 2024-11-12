import Redis from 'ioredis';

const redisClient =  () => {
    if(process.env.REDIS_URL){
        console.log('Redis Connected');
        return process.env.REDIS_URL;
    }
    throw new Error('redis Connection Failed');
}

const redisClient2 =  () => {
    if(process.env.USER_REDIS_URL){
        console.log('Redis Connected');
        return process.env.USER_REDIS_URL;
    }
    throw new Error('redis Connection Failed');
}

const redis = new Redis(redisClient());
const redis2 = new Redis(redisClient2());

export {redis,redis2};
