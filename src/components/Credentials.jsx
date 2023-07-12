export default function Credentials(props) {
    const { Header, Body, Badges } = props

    if (!Header || !Badges) {
        return <div>failed to load</div>
    }

    return (
        <section className="editable-component relative bg-secondary-700 px-6 py-24 lg:px-8 lg:py-32" data-json="credentials">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                    <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
                        <h2 className="text-3xl font-display font-semibold tracking-tight text-white lg:text-4xl">
                            {Header}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-white">
                            {Body}
                        </p>
                    </div>
                    <div className="md:grid-col-3 mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-x-12 gap-y-12 opacity-100 mix-blend-screen grayscale invert filter sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:pl-8">
                        {Badges.map((badge) => (
                            <img
                                key={badge.badgeAltText}
                                className="max-h-16 w-full object-contain lg:object-center"
                                src={`/images/${badge.badgeChoice}`}
                                alt={badge.badgeAltText}
                                width={128}
                                height={64}
                                loading="lazy"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
