export default function AboutFeature(props) {
    const { Tagline, Header, Body, ImageUrl, AltText } = props

    if (!Header || !ImageUrl || !AltText ) {
        return <div>failed to load</div>
    }

    return (
        <section className="editable-component relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/*Feature Grid*/}
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:gap-x-20 lg:grid-cols-2 lg:items-start">
                    {/*Image*/}
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <img
                            className="h-[250px] w-[800px] rounded-xl object-cover shadow-xl ring-neutral-400/10 sm:h-[350px] lg:h-[500px]"
                            src={ImageUrl}
                            alt={AltText}
                            loading="lazy"
                        />
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
                            <p className="mt-6 text-lg leading-8 text-neutral-800">
                                {Body}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
