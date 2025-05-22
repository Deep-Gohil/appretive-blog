import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Profile from './Pages/Profile/Profile'
import Settings from './Pages/Settings/Settings'
import Write from './Pages/Write/Write'
import { Toaster } from 'react-hot-toast'
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import BlogDetails from './Pages/BlogDetails/BlogDetails'
import ProfileEdit from './Pages/ProfileEdit/ProfileEdit'
import Verify from './Pages/Verify/Verify'
import Dashboard from './Pages/Dashboard/Dashboard'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile/edit' element={<ProfileEdit/>}/>
        <Route path='/setting' element={<Settings/>}/>
        <Route path='/write' element={<Write/>}/>
        <Route path='/blog-details/:id' element={<BlogDetails/>}/>
        <Route path='/verify/:email' element={<Verify/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App