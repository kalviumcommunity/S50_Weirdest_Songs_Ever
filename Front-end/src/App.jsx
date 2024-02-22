import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Signup from './Components/Signup';
import './App.css'

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
      
    </>
  )
}

export default App
