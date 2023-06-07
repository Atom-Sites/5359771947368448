import useSWR from 'swr'
import extractValues from '@/utils/extractValues'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function CallToAction() {

    const { data, error } = useSWR('/api/staticdata?filename=CallToAction.schema.json', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div></div>

    const { title, callToAction, image, buttonText, anchor } = extractValues(data);

    return (
        <>
            <div id={anchor} className="editable-component relative bg-primary-400" data-json='cta'>
                <div className="relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
                    <img className="h-full w-full object-cover" src={image} />
                    <span className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]">
                        <svg viewBox="0 0 926 676" aria-hidden="true" className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]">
                            <path fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)" fill-opacity=".4" d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"></path>
                            <defs>
                                <linearGradient id="60c3c621-93e0-4a09-a0e6-4c228a0116d8" x1="926.392" x2="-109.635" y1=".176" y2="321.024" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#776FFF"></stop>
                                    <stop offset="1" stop-color="#FF4694"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </div>

                <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
                    <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
                        <h2 className="mt-2 text-3xl tracking-tight text-neutral-800 font-extrabold sm:text-4xl sm:leading-tight">{title}</h2>
                        <p className="mt-6 text-base leading-7 text-neutral-800">{callToAction}</p>
                        {/* Big CTA*/}
                        <div className="mt-10 flex items-center justify-left">
                            <div className="flex items-center">
                                <a className="nj-lead font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent font-bold rounded-2xl bg-primary-700 hover:bg-primary-600 transition-all ease-in text-xl py-5 px-5" href="#">Get my free quote!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

