import extractValues from '@/utils/extractValues'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Hero() {

    const { data, error } = useSWR('/api/staticdata?filename=Hero.schema.json', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div></div>

    const { headingText, descriptionText, heroImageUrl, heroImageAlt, anchor } = extractValues(data);

    return (
        <div id={anchor} className="editable-component relative isolate overflow-hidden bg-primary-400" data-json='hero'>
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">

                {/*This is the header and CTA*/}
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <h1 className="mt-10 font-bold tracking-tight text-neutral-800 text-4xl  md:text-5xl lg:text-6xl">{headingText}</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-900">{descriptionText}</p>

                    {/* Big CTA*/}
                    <div className="mt-10 flex items-center justify-left">
                        <div className="flex items-center">
                            <a className="nj-lead font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent font-bold rounded-2xl bg-primary-700 hover:bg-primary-600 transition-all ease-in text-xl py-5 px-5" href="#">Get my free quote!</a>
                        </div>
                    </div>
                </div>

                {/*Hero image*/}
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl p-2 lg:-m-4 lg:rounded-2xl lg:p-4 h-[600px]">
                            <div className="w-[40rem] rounded-md shadow-2xl h-full bg-auto bg-no-repeat bg-cover" style={{ backgroundImage: `url("${heroImageUrl}")` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

