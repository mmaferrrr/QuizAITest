import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Account from './pages/Account';
import QuizGeneration from './pages/QuizGeneration';
import NotFound from './pages/NotFound';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
   
    <div className="App">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/quizgeneration" element={<QuizGeneration />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
     
    </div>
   
  );
}

export default App;
