import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './db-config.js';
import redis from 'redis'
import redisClient from './db-config.js';
import {v4 as uuid} from 'uuid'

dotenv.config()

process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error.message);

});


const app = express()
app.use(cors({
    origin: ["https://usedideas.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    credentials: true
}))
app.use(express.json())

const port = 5000
app.get('/', (req, res) => {
    res.send('123')
})
app.get('/books', async (req, res) => {
    const books = await redisClient.hGetAll('book')
    const booksArr = []
    for (let id in books) {
        books[id] = booksArr.push(JSON.parse(books[id]))
    }
    res.send(booksArr)
})

app.post('/books', async (req, res) => {
    const {title, description, cover} = req.body
    const id = uuid()
    await redisClient.hSet('book', id, JSON.stringify({title, description, cover, id}))
    
    return res.send({
        message: "New book created successfully",
        book: {
            title, description, cover, id
        }
    })
})

app.delete('/books/:id', async (req, res) => {
    const id = req.params.id
    await redisClient.hDel('book', id)
    res.send('Book deleted successfully')
})

app.put('/books/:id', async (req, res) => {
    const id = req.params.id
    const {title, description, cover} = req.body
    await redisClient.hSet('book', id, JSON.stringify({title, description, cover, id}))
    return res.send({
        message: 'Book updated successfully',
        book: {
            title, description, cover, id
        }
    })
})

app.listen(port, () => console.log('Connected to port ' + port))


redisClient.connect().then(() => console.log('connected to redis'))
