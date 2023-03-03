import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Add = ({fetchAllBooks}) => {
  const [book, setBook] = useState({
    title: '',
    description: '',
    cover: ''
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setBook(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  const handleClick = async () => {
    try {
      await axios.post('http://localhost:5000/books', book)
      await fetchAllBooks()
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input onChange={handleChange} type="text" placeholder='title' name='title' />
      <textarea onChange={handleChange} type="text" placeholder='description' name='description'/>
      <input onChange={handleChange} type="text" placeholder='cover' name='cover'/>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}
