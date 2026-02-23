import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import Footer from '../components/home/Footer'
import TemplatesSection from './TemplatesSection'
import Contact from './Contact'

const Home = () => {
  return (
    <div className=" min-h-screen">
        <Banner />
        <Hero />
        <Features />
        <Testimonial />
        <TemplatesSection />
        <Contact />
        <Footer />
    </div>
  )
}

export default Home