import React from 'react'
import { useState } from 'react'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import Header from '@/components/Header'

const testimonials = [
    {
      body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
      author: {
        name: 'Leslie Alexander',
        imageUrl:
          'https://services.google.com/fh/files/misc/google_g_icon_download.png',
      },
    },
  ]

  export default function Work() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
        <Header pagename={'work'} />
        <Nav />
        {/*Hero for secondary pages*/}
        <div className="bg-primary-100 pt-2 lg:pt-5">
            <div className="relative px-6  lg:px-8">
                <div className="mx-auto max-w-2xl py-12 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 md:text-4xl lg:text-6xl">Our Latest Projects</h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-800">Check out some of our newest projects to peek at our capabilities. Our team is committed to providing quality work that meets the highest standards, and our portfolio speaks for itself.</p>
                    </div>
                </div>
            </div>
        </div>

        {/*Gallery Section*/}
        {/*Wrapper Y*/}
        <div className="bg-white py-16 lg:py-20">
            {/*Wrapper X*/}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
            
                {/*Gallery*/}
                <div className="mx-auto flow-root max-w-2xl lg:mx-0 lg:max-w-none">
                    <div class="nj-stories" data-filter-media="show" data-branding="bottom"></div>
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