import React from 'react';
import Navbar from './component/header/Navbar';
import './App.css';
import Footer from './component/footer/Footer';
import HomePage from './component/homepage/HomePage';


function App() {

  return (
    <div className='App'>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
