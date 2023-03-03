import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Update = ({ books, fetchAllBooks }) => {
  const { id } = useParams()
  const [book, setBook] = useState()
  const [prevBook, setPrevBook] = useState({
    title: '',
    description: '',
    cover: '',
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleClick = async () => {
    try {
      await axios.put('http://localhost:5000/books/' + id, book)
      await fetchAllBooks()
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    if (books.length > 0) {
      const currentBookInState = books.find(book => book.id == id)
      setPrevBook(currentBookInState)
      setBook(currentBookInState)
    }
  }, [books])
  return (
    <div className='form'>
      <h1>Edit book "{prevBook.title}"</h1>
      <div className="wrapper">
        <input onChange={handleChange} type="text" placeholder='title' name='title' defaultValue={prevBook.title} />
        <textarea onChange={handleChange} type="text" placeholder='description' name='description' defaultValue={prevBook.description}/>
        <input onChange={handleChange} type="text" placeholder='cover' name='cover' defaultValue={prevBook.cover}/>
        <button onClick={handleClick}>Save</button>
      </div>

    </div>
  )
}
