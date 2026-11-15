import './App.css'
import { Route, Routes } from 'react-router'
import Navbar from './components/NavBar'
import SideBar from './components/SideBar'
import Home from './pages/Home'
import History from './pages/History'

function App() {

  return (
    <div className='w-[100%] h-[100vh] bg-zinc-50'>
      <div className='w-[100%] h-[6.5%]'>
            <Navbar/>
      </div>
      <div className='w-[100%] h-[93.5%] flex'>
        <div className='w-[20%] h-[100%]'>
          <SideBar/>
        </div>
      <div className='w-[80%] h-[100%]'>
      <Routes className='w-[100%] h-[100%]'>
        <Route path='/' element={<Home/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
      </div>
      </div>
    </div>
  )
}

export default App
