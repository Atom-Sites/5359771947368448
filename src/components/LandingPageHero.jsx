export default function HeroFullBG(props) {
    const { headingText, descriptionText, heroImageUrl, heroImageAlt } = props

    console.log('props', props)

    if (!headingText || !descriptionText || !heroImageUrl || !heroImageAlt) {
        return <div>failed to load</div>
    }

    return (
        <section className="bg-neutral-800">
            <div className="relative isolate overflow-hidden">
                <img
                    src={heroImageUrl}
                    alt={heroImageAlt}
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-950 via-neutral-800 to-neutral-950 opacity-80"></div>{' '}
                {/* Gradient overlay */}
                <div className="mx-auto max-w-2xl px-6 py-32 sm:py-48 lg:px-0">
                    <div className="text-center">
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-white md:text-5xl lg:max-w-4xl lg:text-6xl">
                            {headingText}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-200">
                            {descriptionText}
                        </p>

                        {/* Big CTA*/}
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <div className="flex items-center">
                                <a className="nj-lead font-heading focus-visible:transparent rounded-2xl bg-primary-700 px-5 py-5 text-xl font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                                    Get my free estimate!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
