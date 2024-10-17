
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import View from './Pages/View'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import Wishlist from './Pages/Wishlist'


function App() {

  return (
    <>
    {/* <Header insideHome={true}/> */}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Wishlist' element={<Wishlist/>}/>
    <Route path='/Cart' element={<Cart/>}/>
    <Route path='/View/:id' element={<View/>}/>
    {/* {redirect to home} */}
    <Route path='/*' element={<Navigate to={'/'}/> }/>
    </Routes>
    <Footer/>
     
    </>
  )
}

export default App
