'use client'
import makeId from '@/utils/makeId'
import { Email } from 'react-obfuscate-email'
import { formatPhoneNumber } from '../utils/formatPhoneNumber'

export default function Footer(props) {
    const {
        Header,
        email,
        phone,
        address,
        socials,
        footerText,
        services,
        brand,
    } = props
    const { brand_name, brand_logo, brand_url } = brand

    if (!services) {
        return <div>failed to load</div>
    }

    return (
        <footer
            className="editable-component relative bg-primary-950"
            data-json="footer"
        >
            <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 sm:pt-20 lg:px-8">
                {/*Footer intro*/}
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                            {Header}
                        </h2>
                        <p className="max-w-xl leading-7 text-white">
                            {footerText}
                        </p>
                        <div className="flex space-x-6">
                            {socials.map((social) => (
                                <div key={social.name}>
                                    <a
                                        href={social.href}
                                        className="text-primary-300
                                         transition-all ease-in hover:text-primary-200"
                                    >
                                        <span className="sr-only">
                                            {social.name}
                                        </span>
                                        <span className="h-6 w-6">
                                            {iconLookup(social.name)}
                                        </span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*Footer menu*/}
                    <div className="mt-16 grid grid-cols-2 place-content-evenly gap-8 xl:col-span-2 xl:mt-0">
                        {/*Footer menu What We Do*/}
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div className="">
                                <ul className="mt-6 space-y-4"></ul>
                            </div>
                            <div className="">
                                <h3 className="font-display text-base font-semibold leading-6 text-white">
                                    Our Services
                                </h3>
                                <ul className="mt-6 space-y-4">
                                    {services.map((service) => (
                                        <li key={service.anchor} className="">
                                            <a
                                                className="text-sm leading-6  text-white opacity-70 transition-all ease-in hover:opacity-100"
                                                href={`/#${makeId(
                                                    service.anchor
                                                )}`}
                                            >
                                                {service.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/*Footer menu About Us*/}
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div className=" mt-6 md:mt-0">
                                <h3 className="font-display text-base font-semibold leading-6 text-white">
                                    Who We Are
                                </h3>
                                <ul className="mt-6 space-y-4">
                                    <li className="">
                                        <a
                                            className="text-sm leading-6  text-white opacity-70 transition-all ease-in hover:opacity-100"
                                            href="/reviews"
                                        >
                                            Reviews
                                        </a>
                                    </li>
                                    <li className="">
                                        <a
                                            className="text-sm leading-6  text-white opacity-70 transition-all ease-in hover:opacity-100"
                                            href="/work"
                                        >
                                            Our Work
                                        </a>
                                    </li>
                                    <li className="">
                                        <a
                                            className="text-sm leading-6  text-white opacity-70 transition-all ease-in hover:opacity-100"
                                            href="/faq"
                                        >
                                            FAQ
                                        </a>
                                    </li>
                                    <li className="">
                                        <a
                                            className="text-sm leading-6  text-white opacity-70 transition-all ease-in hover:opacity-100"
                                            href="/about-us"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/*Footer menu Get in Touch*/}
                            <div className="md:grid md:grid-cols-1 md:gap-8">
                                <div className="mt-10 md:mt-0">
                                    <h3 className="font-display text-base font-semibold leading-6 text-white">
                                        Get in Touch
                                    </h3>
                                    <ul className="mt-6 space-y-4">
                                        <li className="">
                                            <p className="text-sm leading-6  text-white opacity-70 transition-all ease-in hover:opacity-100">
                                                <Email
                                                    subject="Website Inquiry"
                                                    email={email}
                                                >
                                                    Email Us
                                                </Email>
                                            </p>
                                        </li>
                                        <li className="">
                                            <a
                                                className="text-sm leading-6  text-white opacity-70 transition-all ease-in hover:opacity-100"
                                                href={`tel:${phone}`}
                                            >
                                                {formatPhoneNumber(phone)}
                                            </a>
                                        </li>
                                        <li className="">
                                            <div className="text-sm leading-6 text-white opacity-70 transition-all ease-in">
                                                {address}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Copyright*/}
                <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    {/*Nicejob Atom*/}
                    <a
                        href={brand_url}
                        className="opacity-70 brightness-100 grayscale  filter transition-all ease-in hover:opacity-100"
                    >
                        <img
                            className="flex h-8 w-28"
                            src={brand_logo}
                            alt={`Crafted by ${brand_name}}`}
                            loading="lazy"
                        />
                    </a>
                    {/*Privacy*/}
                    <div className="flex items-center">
                        <p className="py-2 text-xs leading-5 text-white opacity-70">
                            Copyright {new Date().getFullYear()}
                        </p>
                        <p className="px-1 py-2 text-xs leading-5 text-neutral-400">
                            |
                        </p>
                        <a
                            href="/privacy"
                            className="text-white opacity-70 transition-all ease-in hover:opacity-100"
                        >
                            <p className="py-2 text-xs leading-5">Privacy</p>
                        </a>
                        {/*Link to top*/}
                        <div className=" ml-6 flex">
                            <a
                                href="#top"
                                className="text-white opacity-70 transition-all ease-in hover:opacity-100"
                                aria-label="Back to Top"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-10 w-10"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function iconLookup(network) {
    switch (network.toLowerCase()) {
        case 'facebook':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 896 1664"
                >
                    <path
                        fill="currentColor"
                        d="M895 12v264H738q-86 0-116 36t-30 108v189h293l-39 296H592v759H286V905H31V609h255V391q0-186 104-288.5T667 0q147 0 228 12z"
                    />
                </svg>
            )
        case 'instagram':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1536 1536"
                >
                    <path
                        fill="currentColor"
                        d="M1024 768q0-106-75-181t-181-75t-181 75t-75 181t75 181t181 75t181-75t75-181zm138 0q0 164-115 279t-279 115t-279-115t-115-279t115-279t279-115t279 115t115 279zm108-410q0 38-27 65t-65 27t-65-27t-27-65t27-65t65-27t65 27t27 65zM768 138q-7 0-76.5-.5t-105.5 0t-96.5 3t-103 10T315 169q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103t-3 96.5t0 105.5t.5 76.5t-.5 76.5t0 105.5t3 96.5t10 103T169 1221q20 50 58 88t88 58q29 11 71.5 18.5t103 10t96.5 3t105.5 0t76.5-.5t76.5.5t105.5 0t96.5-3t103-10t71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103t3-96.5t0-105.5t-.5-76.5t.5-76.5t0-105.5t-3-96.5t-10-103T1367 315q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10t-96.5-3t-105.5 0t-76.5.5zm768 630q0 229-5 317q-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124T5 1085q-5-88-5-317t5-317q10-208 124-322T451 5q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z"
                    />
                </svg>
            )
        case 'twitter':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1600 1280"
                >
                    <path
                        fill="currentColor"
                        d="M1588 152q-67 98-162 167q1 14 1 42q0 130-38 259.5T1273.5 869T1089 1079.5t-258 146t-323 54.5q-271 0-496-145q35 4 78 4q225 0 401-138q-105-2-188-64.5T189 777q33 5 61 5q43 0 85-11q-112-23-185.5-111.5T76 454v-4q68 38 146 41q-66-44-105-115T78 222q0-88 44-163q121 149 294.5 238.5T788 397q-8-38-8-74q0-134 94.5-228.5T1103 0q140 0 236 102q109-21 205-78q-37 115-142 178q93-10 186-50z"
                    />
                </svg>
            )
        case 'google':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1536 1536"
                >
                    <path
                        fill="currentColor"
                        d="M768 658h725q12 67 12 128q0 217-91 387.5T1154.5 1440T768 1536q-157 0-299-60.5T224 1312T60.5 1067T0 768t60.5-299T224 224T469 60.5T768 0q300 0 515 201l-209 201Q951 283 768 283q-129 0-238.5 65T356 524.5T292 768t64 243.5T529.5 1188t238.5 65q87 0 160-24t120-60t82-82t51.5-87t22.5-78H768V658z"
                    />
                </svg>
            )
        case 'yelp':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1408 1792"
                >
                    <path
                        fill="currentColor"
                        d="M709 1319v127q-1 292-6 305q-12 32-51 40q-54 9-181.5-38T308 1664q-13-15-17-36q-1-12 4-26q4-10 34-47t181-216q1 0 60-70q15-19 39.5-24.5t49.5 3.5q24 10 37.5 29t12.5 42zm-149-251q-3 55-52 70l-120 39q-275 88-292 88q-35-2-54-36q-12-25-17-75q-8-76 1-166.5T56 863t56-32q13 0 202 77q71 29 115 47l84 34q23 9 35.5 30.5T560 1068zm826 297q-7 54-91.5 161T1159 1653q-37 14-63-7q-14-10-184-287l-47-77q-14-21-11.5-46t19.5-46q35-43 83-26q1 1 119 40q203 66 242 79.5t47 20.5q28 22 22 61zM714 733q5 102-54 122q-58 17-114-71L168 186q-8-35 19-62q41-43 207.5-89.5T619 3q40 10 49 45q3 18 22 305.5T714 733zm662 108q3 39-26 59q-15 10-329 86q-67 15-91 23l1-2q-23 6-46-4t-37-32q-30-47 0-87q1-1 75-102q125-171 150-204t34-39q28-19 65-2q48 23 123 133.5t81 167.5v3z"
                    />
                </svg>
            )
        case 'youtube':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1792 1280"
                >
                    <path
                        fill="currentColor"
                        d="m711 872l484-250l-484-253v503zM896 10q168 0 324.5 4.5T1450 24l73 4q1 0 17 1.5t23 3t23.5 4.5t28.5 8t28 13t31 19.5t29 26.5q6 6 15.5 18.5t29 58.5t26.5 101q8 64 12.5 136.5T1792 532v176q1 145-18 290q-7 55-25 99.5t-32 61.5l-14 17q-14 15-29 26.5t-31 19t-28 12.5t-28.5 8t-24 4.5t-23 3t-16.5 1.5q-251 19-627 19q-207-2-359.5-6.5T336 1256l-49-4l-36-4q-36-5-54.5-10t-51-21t-56.5-41q-6-6-15.5-18.5t-29-58.5T18 998q-8-64-12.5-136.5T0 748V572q-1-145 18-290q7-55 25-99.5T75 121l14-17q14-15 29-26.5T149 58t28-13t28.5-8t23.5-4.5t23-3t17-1.5q251-18 627-18z"
                    />
                </svg>
            )
        case 'houzz':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M275.9 330.7H171.3V480H17V32h109.5v104.5l305.1 85.6V480H275.9z"
                    />
                </svg>
            )
    }
}
