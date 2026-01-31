import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home.js'
import Contact from './Pages/Contact.js'
import AboutUs from './Pages/AboutUs.js'
import Navbar from './Pages/Navbar.js'
import Footer from './Pages/Footer.js'
import Menu from './Pages/Menu.js'


function App() {

  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/contact" element={<Contact/>}/>
       <Route path="/About" element={<AboutUs/>}/>
       <Route path="/Menu" element={<Menu/>}/>
    </Routes>
    <Footer/>
    </div> 

  )
}

export default App
