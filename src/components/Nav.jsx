'use client'
import { classNames } from '@/utils/classNames'
import makeId from '@/utils/makeId'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

export default function Nav(props) {
    const { buttonText, altText, services, phone, company } = props
    const { logoUrl } = company

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-10 bg-white shadow">
            <nav className="mx-auto flex max-w-screen-2xl items-center justify-between lg:px-8">
                {/* Logo */}
                <div className="flex">
                    <a href="/" className=" p-1.5">
                        <img
                            className="w={275} h-16 w-auto lg:h-20"
                            src={logoUrl}
                            alt={altText}
                            width={275}
                            height={100}
                        />
                    </a>
                </div>

                {/* CTAs mobile only */}
                <div className="flex lg:hidden">
                    <div className="hidden items-center sm:flex">
                        <a className="nj-lead font-heading focus-visible:transparent rounded-2xl bg-primary-700 px-4 py-3 text-base font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                            {buttonText}
                        </a>
                    </div>

                    <div className="ml-2 flex items-center">
                        <a
                            title="Call us!"
                            href={`tel: ${phone}`}
                            className="font-heading rounded-2xl bg-secondary-700 px-3 py-3.5 text-base font-bold text-white shadow-sm transition-all ease-in hover:bg-secondary-600 focus-visible:outline focus-visible:outline-0  focus-visible:outline-offset-2 focus-visible:outline-transparent"
                            aria-label="Call us"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>

                    <button
                        type="button"
                        className=" inline-flex items-center justify-center rounded-md p-5 text-neutral-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Menu on a larger screen */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Popover.Group className="mr-4 hidden justify-end py-5 lg:flex lg:gap-x-8">
                        <Popover className="relative">
                            <Popover.Button className="focus-visible:transparent flex items-center gap-x-1 text-sm font-semibold leading-6 text-neutral-800 hover:text-primary-700 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                                Our Services
                            </Popover.Button>
                            <Popover.Overlay className="fixed inset-0" />
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                {/* Dropdown menu on a larger screen */}
                                <Popover.Panel className="max-w- absolute -left-8 top-full z-10 mt-12  w-64 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-neutral-200">
                                    <div className="p-2">
                                        {services.map((item, i) => (
                                            <div
                                                key={item.serviceName}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-neutral-100"
                                            >
                                                {/* Dropdown Items */}
                                                <div className="flex-auto">
                                                    <Popover.Button
                                                        as={'a'}
                                                        href={`/#${makeId(
                                                            item.serviceAnchor
                                                        )}`}
                                                        className="block font-semibold text-neutral-800 "
                                                    >
                                                        {item.serviceName}
                                                        <span className="absolute inset-0" />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>

                        <a
                            href="/reviews"
                            className="focus-visible:transparent current:text-primary-700 text-sm font-semibold leading-6 text-neutral-900 transition-all ease-in hover:text-primary-700 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                        >
                            Reviews
                        </a>
                        <a
                            href="/work"
                            className="focus-visible:transparent current:text-primary-700 text-sm font-semibold leading-6 text-neutral-900 transition-all ease-in hover:text-primary-700 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                        >
                            Our Work
                        </a>
                        <a
                            href="/about-us"
                            className="focus-visible:transparent current:text-primary-700 mr-6 text-sm font-semibold leading-6 text-neutral-900 transition-all ease-in hover:text-primary-700 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                        >
                            About Us
                        </a>
                    </Popover.Group>

                    {/*CTAs on a larger screen*/}
                    <div className="flex items-center">
                        <a className="nj-lead font-heading focus-visible:transparent rounded-2xl bg-primary-700 px-4 py-3.5 text-base font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                            {buttonText}
                        </a>
                    </div>
                    <div className="ml-2 flex items-center">
                        <a
                            aria-label="Call us"
                            href={`tel: ${phone}`}
                            className="font-heading rounded-2xl bg-secondary-700 px-4 py-4 text-base text-white shadow-sm transition-all ease-in hover:bg-secondary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:outline-transparent"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Menu on mobile */}
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-neutral-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-neutral-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-neutral-900 transition-all ease-in hover:bg-neutral-50">
                                                Our Services
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open
                                                            ? 'rotate-180'
                                                            : '',
                                                        'h-5 w-5 flex-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {services.map((item) => (
                                                    <Disclosure.Button
                                                        key={item.serviceAnchor}
                                                        as="a"
                                                        href={`/#${makeId(
                                                            item.serviceAnchor
                                                        )}`}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-neutral-900 hover:bg-neutral-50"
                                                        onClick={() => {
                                                            setMobileMenuOpen(
                                                                false
                                                            )
                                                        }}
                                                    >
                                                        {item.serviceName}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href="/reviews"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 transition-all ease-in hover:bg-neutral-50"
                                >
                                    Reviews
                                </a>
                                <a
                                    href="/work"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 transition-all ease-in hover:bg-neutral-50"
                                >
                                    Our Work
                                </a>
                                <a
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 transition-all ease-in hover:bg-neutral-50"
                                >
                                    About Us
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
