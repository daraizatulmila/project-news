import { MenuIcon, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false);
const [showRegister, setShowRegister] = useState(false);


  return (
    <>
      <nav className="z-50 border-b-2 border-white flex bg-blue-800 w-screen h-16 fixed top-0 left-0 items-center justify-between px-4">
        <div className="text-white font-bold text-xl">TKJ NEWS</div>

       
        <ul className="hidden gap-6 text-white md:flex items-center">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#news" className="hover:underline">News</a></li>
          <li><a href="#guru" className="hover:underline">Guru</a></li>

        </ul>

        
        <button
          className="md:hidden inline-flex w-6 h-6 relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className={`text-white w-6 h-6 absolute transition-all duration-200 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
          <X className={`text-white w-6 h-6 absolute transition-all duration-200 ${isOpen ? 'opacity-100 rotate-90' : 'opacity-0 rotate-0'}`} />
        </button>
      </nav>

      
      <div className={`md:hidden absolute left-0 w-screen py-4 bg-blue-800 z-40 transition-all duration-200 ${isOpen ? 'top-16' : '-top-96'}`}>
        <ul className="flex flex-col text-white items-center gap-4">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#news" className="hover:underline">News</a></li>
          <li><a href="#guru" className="hover:underline">Guru</a></li>
         
        </ul>
      </div>
    </>
  )
}

export default Navbar
