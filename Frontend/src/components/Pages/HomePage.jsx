import React from 'react'
import Navbar from '../Navbar'
import HeroSection from './HeroSection'
import Card from './Card'
import Teacher from './Teacher'
import Footer from '../Footer'

const HomePage = () => {
  return (
    <main>
        <Navbar/>
        <HeroSection/>
        <Card/>
        <Teacher/>
        <Footer/>
    </main>
  )
}

export default HomePage