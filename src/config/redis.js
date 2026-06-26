const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URI
});

redisClient.on('error', (err) => console.log('Error en Redis Client', err));
redisClient.on('connect', () => console.log('Conectado a Redis'));

const connectRedis = async () => {
  await redisClient.connect();
};

module.exports = { redisClient, connectRedis };