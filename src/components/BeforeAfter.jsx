'use client'
import { ImgComparisonSlider } from '@img-comparison-slider/react'

export default function BeforeAfter(props) {
    const { Tagline, Header, Body, BeforeAltText, AfterAltText, imageUrlBefore, imageUrlAfter, CTA,} = props

    if (!Header || !Body || !AfterAltText || !BeforeAltText || !imageUrlBefore || !imageUrlAfter || !CTA
    ) {
        return <div>failed to load</div>
    }

return (
    <section className="editable-component relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
            {/*Feature Grid*/}
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                {/*Image*/}
                <div className="w-full md:px-0">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                        <ImgComparisonSlider className="slider-split-line slider-nofocus cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing">
                                <img slot="first" alt={BeforeAltText} className="object-cover" width="1000" height="1000" src={imageUrlBefore} loading="lazy"/>
                                <img slot="second" alt={AfterAltText} className="object-cover" width="1000" height="1000" src={imageUrlAfter} loading="lazy"/>
                                <svg slot="handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
                                    {' '}
                                    <path
                                        stroke="#fff"
                                        d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2"
                                        strokeWidth="1"
                                        fill="#fff"
                                        vectorEffect="non-scaling-stroke"
                                    ></path>
                                </svg>
                        </ImgComparisonSlider>
                    </div>
                </div>

                {/*Text Copy*/}
                <div className="px-6 md:px-0">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                        <h2 className="text-base font-bold uppercase leading-7 tracking-wide text-primary-600">
                            {Tagline}
                        </h2>
                        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-neutral-800 md:text-3xl lg:text-4xl">
                            {Header}
                        </h2>
                        <p className="mt-6 text-base leading-8 text-neutral-800">
                            {Body}
                        </p>
                        <div className="justify-left mt-10 flex items-center">
                            <div className="flex items-center">
                                <a className="nj-lead font-heading focus-visible:transparent rounded-2xl bg-primary-700 px-4 py-3 text-base font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                                    {CTA}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}
