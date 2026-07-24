const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

redisClient.on('error', (err) => console.log('Error en Redis Client', err));
redisClient.on('connect', () => console.log('¡Conectado a Redis exitosamente!'));
const connectRedis = async () => {
  await redisClient.connect();
};

module.exports = { redisClient, connectRedis };