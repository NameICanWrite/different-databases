import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

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
const pool = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'S+r0n9pa55w0rd',
    database: 'test'
})
app.get('/', (req, res) => {
    res.send('123')
})
app.get('/books', async (req, res) => {
        const query = "SELECT * FROM books"
        const [books] = await pool.query(query)
        res.send(books)
})

app.post('/books', async (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const {title, desc, cover} = req.body
    const values = [
        title,
        desc,
        cover,
    ]

    const [rows] = await pool.query(query, [values])
    return res.send('book created successfully')
})

app.delete('/books/:id', async (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM books WHERE id = ?"
    await pool.query(query, [id])
    res.send('deleted successfully')
})

app.put('/books/:id', async (req, res) => {
    const id = req.params.id
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?"
    const {title, desc, cover} = req.body
    const values = [
        title,
        desc,
        cover,
    ]

    const [rows] = await pool.query(query, [...values, id])
    return res.send('book updated successfully')
})

app.listen(port, () => console.log('Connected to port ' + port))