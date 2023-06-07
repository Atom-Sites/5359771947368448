import React, { useEffect } from 'react'

import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Service'
import Header from '@/components/Header'

import USP from '@/components/USP'
import Testimonials from '../components/Testimonials'

export default function Home() {
    return (
        <>
            <Header pagename={'index'} />
            <Nav />
            <Hero />
            <USP />
            <Services />
            <Testimonials />
            <CallToAction />
            <Footer />
        </>
    )
}
