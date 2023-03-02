import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Books } from './pages/Books';
import { Add } from './pages/Add';
import { Update } from './pages/Update';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([])

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/books')
      setBooks(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books books={books}/>} />
          <Route path="/add" element={<Add fetchAllBooks={fetchAllBooks}/>} />
          <Route path="/update/:id" element={<Update fetchAllBooks={fetchAllBooks} books={books}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
