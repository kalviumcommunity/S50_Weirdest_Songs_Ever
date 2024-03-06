import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Update from './Components/Update';
import Create from './Components/Create';
import UpdatePost from './Components/UpdatePost'

import './App.css'
import ManagePosts from './Components/ManagePosts';

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/update/:id' element={<Update/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/posts' element={<ManagePosts/>}/>
      <Route path='/edit/:id' element={<UpdatePost/>}/>
    </Routes>
      
    </>
  )
}

export default App
