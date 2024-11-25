import Redis from 'ioredis';

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log('Redis 1 Connected');
    return new Redis(process.env.REDIS_URL);
  }
  throw new Error('Redis 1 Connection Failed');
};

const redisClient2 = () => {
  if (process.env.REDIS2_URL) {
    console.log('Redis 2 Connected');
    return new Redis(process.env.REDIS2_URL);
  }
  throw new Error('Redis 2 Connection Failed');
};

const redisClient3 = () => {
    if (process.env.REDIS3_URL) {
      console.log('Redis 2 Connected');
      return new Redis(process.env.REDIS3_URL);
    }
    throw new Error('Redis 2 Connection Failed');
  };

const redis = redisClient();
const redis2 = redisClient2();
const redis3 = redisClient3();

const redisWithFallback = async (operation, ...args) => {
  const clients = [redis,redis2, redis3];

  for (const client of clients) {
    try {
      const result = await client[operation](...args);
      return result;
    } catch (error) {
      console.error(`Redis operation failed on client: ${client.options.host}`, error);
    }
  }
  throw new Error('All Redis clients failed');
};

export { redisWithFallback };
