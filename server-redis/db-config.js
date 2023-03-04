import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import redis from 'redis'

dotenv.config()

const redisClient = redis.createClient({url: process.env.REDIS_URL})
export default redisClient