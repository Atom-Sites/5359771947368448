import React from 'react'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import Header from '@/components/Header'

import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
export default function Privacy() {
    return (
        <>
        <Header pagename={'privacy'} />
        <Nav />

        <div className="bg-white py-20 lg:pt-24">
        <div className="mx-auto max-w-3xl  px-6  lg:px-8 text-base leading-7 text-neutral-800">
        <h1 className="text-base font-bold leading-7 text-primary-700 uppercase tracking-wide">The Small Print</h1>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-800 md:text-3xl lg:text-4xl">Our Privacy Policy</h2>

        <div className="mt-10 max-w-2xl">
          <p>
          This privacy policy applies solely to information collected by this site. It will notify you of the following:
          </p>
          <ul role="list" className="mt-5 max-w-xl space-y-2 text-neutral-800">
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
                About what personally identifiable information is collected from you through the site, how it is used, and with whom it may be shared. 
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
              About what choices are available to you regarding the use of your data. 
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
              Security procedures are in place to protect against the misuse of your information. 
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
              How you can correct any inaccuracies in the information.  
              </span>
              </li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-neutral-800">Information Collection, Use, & Sharing</h2>
          <p className="mt-6">
          We are the sole owners of the information collected on this site. We only have access to/collect the information you voluntarily give us via email or other direct contact. We will not sell or rent this information to anyone. We will use your information to respond to you regarding why you contacted us. We will not share your information with any third party outside of our organization other than as necessary to fulfill your request, e.g., to ship an order. Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-neutral-800">Your Access to & Control Over Information</h2>
          <p className="mt-6">
          You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:
          </p>
          <ul role="list" className="mt-5 max-w-xl space-y-2 text-neutral-800">
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
              See what data we have about you, if any. 
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
              Change or correct any data we have about you.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
              Have us delete any data we have about you.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <span>
              Express any concern you have about our use of your data.
              </span>
              </li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-neutral-800">Security</h2>
          <p className="mt-6">
          We take precautions to protect your information. When you submit sensitive information via the website, your information is protected online and offline. Wherever we collect sensitive information (such as credit card data), that information is encrypted and securely transmitted to us. You can verify this by looking for a closed lock icon at the bottom of your web browser or "https" at the beginning of the web page's address.
          </p>
          <p className="mt-6">
          While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers where we store personally identifiable information are kept securely.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-neutral-800">Updates</h2>
          <p className="mt-6">
          Our privacy policy may change from time to time. All updates will be posted on this page.
          </p>
    
        </div>

       
      </div>
    </div>




        <Footer />
        </>
    )
}
