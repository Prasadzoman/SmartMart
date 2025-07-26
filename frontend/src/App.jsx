import {Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Landing from './pages/Landing';
import Show from './pages/Show';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import ReorderSuggestions from './pages/ReorderSuggestions';
import Footer from './components/Footer';
function App() {
  
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/:id" element={<Show />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Profile/>}/>
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/suggestions" element={<ReorderSuggestions />} />
      </Routes>
   <Footer></Footer>
    </>
  )
}

export default App;
