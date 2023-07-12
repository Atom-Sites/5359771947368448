export default function Hero(props) {
    const { Header, Body, CTA, ImageUrl, AltText, Anchor } = props

    if (!Header) {
        return <div>failed to load</div>
    }

    return (
        <div
            id={Anchor}
            className="editable-component relative isolate overflow-hidden bg-primary-100"
            data-json="hero"
        >
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex  lg:px-8">
                <div className="mx-auto my-auto max-w-2xl sm:mx-0 lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
                    <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-800  md:text-5xl lg:text-6xl">
                        {Header}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-neutral-800">
                        {Body}
                    </p>
                    <div className="justify-left mt-10 flex items-center">
                        <div className="flex items-center">
                            <a className="nj-lead font-heading focus-visible:transparent rounded-2xl bg-primary-700 px-5 py-5 text-xl font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                                {CTA}
                            </a>
                        </div>
                    </div>
                </div>

                <img
                    className="mt-10 max-h-[500px] min-h-full w-full max-w-none rounded-xl object-cover shadow-xl ring-gray-400/10 lg:ml-20 lg:mt-0 lg:w-[48rem]"
                    src={ImageUrl}
                    alt={AltText}
                />
            </div>
        </div>
    )
}
