import extractValues from '@/utils/extractValues'
import useSWR from 'swr'


const fetcher = (url) => fetch(url).then((res) => res.json())

function getCorrectImage(source) {
    switch (source) {
        case 'google':
            return '/images/google-color.png'
        default:
            return "" // TODO: Fill out other sources
    }
}


export default function Testimonials({listOnly}) {
    const { data, error } = useSWR('/api/staticdata?filename=Testimonials.schema.json', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div></div>

    const { headerText, headerSubText, testimonials, anchor } = extractValues(data);

    if (listOnly) {
        return testimonials.map((testimonial) => (
                <div key={testimonial.author.handle} className="w-full sm:inline-block">
                    <figure className="h-full rounded-2xl bg-neutral-50 p-8 text-sm leading-6">
                        <div className=' lg:max-h-32 lg:hover:max-h-96 transition-all ease-in-out duration-250 '>
                            <blockquote className="text-neutral-800">
                                <p className="lg:line-clamp-5 lg:hover:line-clamp-none">"{testimonial.body}"</p>
                            </blockquote>
                        </div>

                        <figcaption className="mt-6 flex items-center gap-x-4">
                            <img classNameName="h-10 w-10 rounded-full bg-neutral-50" width={40} height={40} src={testimonial.author.icon} alt="Review received from (Source)" />
                            <div className="font-semibold text-neutral-900">{testimonial.author.name}</div>
                        </figcaption>
                    </figure>
                </div>
            )
        )
    }
    return (
        <div id={anchor} className="editable-component relative py-24 bg-white sm:py-32" data-json='testimonials'>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/*Review Intro*/}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-neutral-800">{headerText}</h2>
                    <h2 className="mt-2 text-3xl tracking-tight  text-neutral-800 font-extrabold sm:text-4xl sm:leading-tight">{headerSubText}</h2>
                </div>

                {/*Reviews*/}
                <div className="mx-auto mt-10 flow-root max-w-3xl lg:mx-0 lg:max-w-none">
                    <div className="grid lg:grid-cols-3 gap-4">
                        {testimonials.map((testimonial) => (
                            <div className=" w-full sm:inline-block">
                                <figure className="h-full rounded-2xl bg-neutral-50 p-8 text-sm leading-6">
                                    <div className=' lg:max-h-32 lg:hover:max-h-96 transition-all ease-in-out duration-250 '>
                                        <blockquote className="text-neutral-800">
                                            <p className="lg:line-clamp-5 lg:hover:line-clamp-none">"{testimonial.body}"</p>
                                        </blockquote>
                                    </div>

                                    <figcaption className="mt-6 flex items-center gap-x-4">
                                        <img classNameName="h-10 w-10 rounded-full bg-neutral-50" width={40} height={40} src={testimonial.author.icon} alt="Review received from (Source)" />
                                        <div className="font-semibold text-neutral-900">{testimonial.author.name}</div>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}

                    </div>

                    {/* Regular CTA*/}
                    <div className="mt-10 flex items-center justify-center">
                        <div className="flex items-center">
                            <a className="nj-lead font-heading text-white shadow-sm focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:transparent font-bold rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition-all ease-in text-base py-3 px-4" href="/reviews">Read more reviews</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

