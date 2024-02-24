import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Update from './Components/Update';
import './App.css'

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/update/:id' element={<Update/>}/>
    </Routes>
      
    </>
  )
}

export default App
