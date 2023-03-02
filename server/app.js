import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './db-config.js';
import Book from './Book.js';

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
    const books = await Book.findAll()
    res.send(books)
})

app.post('/books', async (req, res) => {
    const {title, desc, cover} = req.body
    const book = await Book.create({title, desc, cover})
    return res.send({
        message: "New book created successfully",
        book
    })
})

app.delete('/books/:id', async (req, res) => {
    const id = req.params.id
    await Book.destroy({where: {id}})
    res.send('Book deleted successfully')
})

app.put('/books/:id', async (req, res) => {
    const id = req.params.id
    const {title, desc, cover} = req.body
    const book = await Book.update({title, desc, cover}, {where: {id}})
    return res.send({
        message: 'Book updated successfully',
        book
    })
})

app.listen(port, () => console.log('Connected to port ' + port))

// setup database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to db');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });