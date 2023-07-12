'use client'
import { useEffect, useState } from 'react'

export default function Testimonials(props) {
    const { Tagline, Header, testimonials, CTA, listOnly } = props

    const [limitOneTestimonial, setLimitOneTestimonial] = useState(true)

    useEffect(() => {
        // outside of useEffect, next was throwing `ReferenceError: window is not defined`
        if (window.innerWidth >= 1024) {
            setLimitOneTestimonial(false)
        }
    })

    if (!Header || !testimonials ) {
        return <div>failed to load</div>
    }

    if (listOnly) {
        return testimonials.map((testimonial) => (
            <div
                key={testimonial.author.handle}
                className="w-full sm:inline-block"
            >
                <figure className="h-full rounded-2xl bg-neutral-50 p-8 text-base leading-6">
                    <div className=" duration-250 transition-all ease-in-out lg:max-h-32 lg:hover:max-h-96 ">
                        <blockquote className="text-neutral-800">
                            <p className="lg:line-clamp-5 lg:hover:line-clamp-none">
                                "{testimonial.body}"
                            </p>
                        </blockquote>
                    </div>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                        <img
                            className="h-10 w-10 rounded-full bg-neutral-50"
                            width={40}
                            height={40}
                            src={testimonial.author.icon}
                            alt="Review received from (Source)"
                        />
                        {testimonial.author.name}
                    </figcaption>
                </figure>
            </div>
        ))
    }

    return (
        <div className="editable-component relative bg-white py-24 sm:py-32" data-json="testimonials">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/*Review Intro*/}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-bold uppercase leading-7 tracking-wide text-primary-600">
                        {Tagline}
                    </h2>
                    <h2 className="mt-2 text-3xl font-semibold font-display tracking-tight text-neutral-800 sm:text-4xl sm:leading-tight">
                        {Header}
                    </h2>
                </div>

                {/*Reviews*/}
                <div className="mx-auto mt-10 flow-root max-w-3xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {testimonials.slice(0,limitOneTestimonial ? 1 : testimonials.length).map((testimonial) => (
                                <div
                                    key={testimonial.author.name}
                                    className="w-full max-w-md justify-self-center"
                                >
                                    <figure className="relative flex h-full flex-col rounded-2xl bg-neutral-50 p-8 text-sm leading-6">
                                        <div className="flex-grow">
                                            <div className="transition-all duration-300 ease-in-out lg:max-h-24 lg:hover:max-h-96">
                                                <blockquote className="text-neutral-800">
                                                    <span className="absolute left-4 top-3 ml-1 mt-1 text-primary-700 text-opacity-25">
                                                        <svg
                                                            className="h-8 w-8"
                                                            fill="currentColor"
                                                            viewBox="0 0 448 512"
                                                        >
                                                            <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                                                        </svg>
                                                    </span>
                                                    <blockquote className="text-neutral-800">
                                                        <p className="mt-7 text-base lg:line-clamp-3 lg:hover:line-clamp-none">
                                                            "{testimonial.body}"
                                                        </p>
                                                    </blockquote>
                                                </blockquote>
                                            </div>
                                        </div>
                                        <figcaption className="mt-6 flex items-end">
                                            <img
                                                className="h-6 w-6 rounded-full bg-neutral-50"
                                                src={testimonial.author.icon}
                                                alt={testimonial.author.icon}
                                            />
                                            <div className="ml-4 font-semibold text-neutral-900">
                                                {testimonial.author.name}
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            ))}
                    </div>

                    {/* Regular CTA*/}
                    <div className="mt-10 flex items-center justify-center">
                        <div className="flex items-center">
                            <a
                                className=" font-heading focus-visible:transparent rounded-2xl bg-neutral-800 px-4 py-3 text-base font-bold text-white shadow-sm transition-all ease-in hover:bg-neutral-700 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                                href="/reviews"
                            >
                               {CTA}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
