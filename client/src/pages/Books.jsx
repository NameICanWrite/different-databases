import React, { useEffect, useState } from 'react'
import defaultCover from '../assets/book-default-cover.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const Books = ({books}) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/books/' + id)
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <h1>Some Books Here!!!</h1>
      <div className="books">
        {books.map(book => (
          <div key={book.id} className="book">
            <div className='bookTop'>
              <button className='edit'><Link to={`/update/${book.id}`}>Edit</Link></button>
              <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
            <img src={book.cover || defaultCover} onError={({currentTarget}) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = defaultCover
            }} alt="" />
            <h2>{book.title}</h2>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
      <button className='add'><Link to='/add'>Add new book</Link></button>
    </div>

  )
}
