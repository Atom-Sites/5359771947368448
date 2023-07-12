export default function HeroFullBG(props) {
    const { Header, Body, ImageUrl, AltText, CTA, Anchor, } = props

    if (
        !Header || !CTA
    ) {
        return <div>failed to load</div>
    }

    return (
        <section id={Anchor} className="bg-neutral-800">
            <div className="relative isolate overflow-hidden">

                <img src={ImageUrl} alt={AltText} className="absolute inset-0 -z-10 h-full w-full object-cover"/>

                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-800 via-primary-950 to-neutral-900 opacity-60"></div>

                <div className="mx-auto max-w-4xl px-6 py-32 sm:py-48 lg:px-0">
                    <div className="text-center">
                        <h1 className="mt-10 text-4xl font-display font-semibold tracking-tight text-white md:text-5xl lg:max-w-4xl lg:text-6xl">
                            {Header}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white">
                            {Body}
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a className="nj-lead focus-visible:transparent rounded-2xl bg-primary-700 px-5 py-5 text-xl font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                            {CTA}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
