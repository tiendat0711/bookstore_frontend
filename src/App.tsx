import React, { useState } from 'react';
import Navbar from './component/header/Navbar';
import './App.css';
import Footer from './component/footer/Footer';
import HomePage from './component/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './component/homepage/About';
import BookDetail from './component/product/BookDetail';
import RegisterAccount from './component/user/RegisterAccount';


function App() {
  const [keywordSearch, setKeywordSearch] = useState('');
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar keywordSearch={keywordSearch} setKeywordSearch={setKeywordSearch} />
        <Routes>
          <Route path='/' element={<HomePage keywordSearch={keywordSearch} />} />
          <Route path='/:categoryId' element={<HomePage keywordSearch={keywordSearch} />} />
          <Route path='/about' element={<About />} />
          <Route path='/books/:bookId' element={<BookDetail />} />
          <Route path='/register' element={<RegisterAccount />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
