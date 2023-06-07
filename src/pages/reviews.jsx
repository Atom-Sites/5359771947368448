import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import Header from '@/components/Header'
import Testimonials from '@/components/Testimonials'

  export default function Reviews() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
        <Header pagename={'reviews'} />
        <Nav />

        {/*Hero for secondary pages*/}
        <div className="bg-primary-100 pt-2 lg:pt-5">
            <div className="relative px-6  lg:px-8">
                <div className="mx-auto max-w-2xl py-12 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 md:text-4xl lg:text-6xl">Our Customer Stories</h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-800">Your community is talking about us. Experience why residents in and around (the city) are raving about us. We provide top-notch (services) services that will exceed your expectations.</p>
                    </div>
                </div>
            </div>
        </div>


    {/*Review Section*/}
        {/*Wrapper Y*/}
        <div className="bg-white py-16 lg:py-20">
            {/*Wrapper X*/}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
            
                {/*Review*/}
                <div className="mx-auto flow-root max-w-3xl lg:mx-0 lg:max-w-none">
                        <div className="nj-stories" data-filter-media="hide" data-media="hide" data-branding="bottom"></div>

                    {/* Regular CTA*/}
                    <div className="mt-10 flex items-center justify-center">
                        <div className="flex items-center">
                            <a className="nj-lead font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent font-bold rounded-2xl bg-primary-700 hover:bg-primary-600 transition-all ease-in text-base py-3 px-4" href="#">Get started today!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                    
        <Footer/>
        </>
    )
}