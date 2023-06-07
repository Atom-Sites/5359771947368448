import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import useSWR from 'swr'
import extractValues from '@/utils/extractValues'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  

  const { data: nav_data, error: nav_error } = useSWR('/api/staticdata?filename=Nav.schema.json', fetcher)
  const { data: service_data, error: service_error } = useSWR('/api/staticdata?filename=Service.schema.json', fetcher)
  const { data: company_data, error: company_error } = useSWR('/api/staticdata?filename=company_id.json', fetcher);

  if (nav_error || service_error || company_error) return <div>failed to load</div>
  if (!nav_data || !service_data || !company_data) return <div></div>
  
  const { logoUrl, navLinks } = extractValues(nav_data)
  const services = service_data.services.value

  console.log(services);
  return (
    <header className="bg-white sticky top-0 z-10 py-1 shadow">
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between lg:px-8" aria-label="Global">

        {/*This is the logo on mobile*/}
        <div className="flex lg:hidden">
          <a href="#" className=" p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src={logoUrl} alt="Put the Company Name as alt te" />
          </a>
        </div>
        
        {/*This is the logo on desktop*/}
        <div className="hidden lg:flex ">
          <a href="#" className=" p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-20 w-auto" src={logoUrl} alt="Put the Company Name as alt te" />
          </a>
        </div>

        {/*CTAs Mobile only*/}
        <div className="flex lg:hidden">
     
          {/* Regular CTA*/}
          <div className="flex items-center">
            <a className="nj-lead font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent font-bold rounded-2xl bg-primary-700 hover:bg-primary-600 transition-all ease-in text-base py-3 px-4" href="#">Get Quote</a>
          </div>

          <div className="flex items-center ml-2">
            <a href={`tel: ${company_data.phone}`} className="font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:outline-transparent font-bold text-base py-3.5 px-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700  transition-all ease-in"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path fillrule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" cliprule="evenodd" />
                </svg>
              </a>
            </div>
          <button
            type="button"
            className=" inline-flex p-5 items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>



        {/*This is the menu on a larger screen*/}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Popover.Group className="hidden lg:flex justify-end lg:gap-x-8 j py-5 mr-4">
                <Popover className="relative">
                  <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent hover:text-primary-700">
                      Our Services
                    < ChevronDownIcon className="hidden h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >

                  {/*This is the dropdown menu on a larger screen*/}
                    <Popover.Panel className="absolute -left-8 top-full z-10 mt-12 w-64  max-w- overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-trueGray-200">
                      <div className="p-2">
                        {services.map((item, i) => (
                          <div key={item.serviceBlurb} className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-trueGray-100">

                            {/*Dropdown icons hidden for now*/}  
                            {/* <div className="hidden flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-primary-100 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-primary-600" aria-hidden="true" />
                            </div> */}
                                {/*Dropdown Items*/}  
                            <div className="flex-auto">
                                <a href={`/#${item.serviceSlug}`} className="block font-semibold text-gray-900 ">
                                  {item.serviceBlurb}
                                  <span className="absolute inset-0" />
                                </a>
                            </div>
                        </div>
                      ))}
                    </div>
                </Popover.Panel>
              </Transition>
            </Popover>

          <a href="/reviews" className="text-sm font-semibold leading-6 text-gray-900 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent hover:text-primary-700 current:text-primary-700">
            Reviews
          </a>
          <a href="/work" className="text-sm font-semibold leading-6 text-gray-900 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent hover:text-primary-700 current:text-primary-700 mr-6">
            Our Work
          </a>

        </Popover.Group>
        {/*CTAs on a larger screen*/}
        {/* Regular CTA*/}
        <div className="flex items-center">
          <a className="nj-lead font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent font-bold rounded-2xl bg-primary-700 hover:bg-primary-600 transition-all ease-in text-base py-3.5 px-4" href="#">Get Quote</a>
        </div>
        <div className="flex items-center ml-2.5">
          <a href={`tel: ${company_data.phone}`} className="font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:outline-transparent text-base py-4 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition-all ease-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillrule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" cliprule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </nav>

      
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src={logoUrl}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-all ease-in">
                        Our Services
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {services.map((item) => (
                          <Disclosure.Button
                            key={item.serviceBlurb}
                            as="a"
                            href={`/#${item.serviceSlug}`}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.serviceBlurb}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="/reviews"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-all ease-in"
                >
                  Reviews
                </a>
                <a
                  href="/work"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-all ease-in"
                >
                  Our Work
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
