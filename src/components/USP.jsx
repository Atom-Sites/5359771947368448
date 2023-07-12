export default function USP(props) {
    const { Header, Body, Features } = props

    if (!Header || !Features) {
        return <div>failed to load</div>
    }

    return (
        <section
            className="editable-component relative bg-white py-20 lg:py-32"
            data-json="usp"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/*Section Intro Left*/}
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-800 md:text-3xl lg:text-4xl">
                        {Header}
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-neutral-800">
                        {Body}
                    </p>
                </div>

                {/*USP Grid*/}
                <div className="mx-auto mt-10 max-w-2xl sm:mt-10 lg:mt-20 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
                        {Features.slice(0, 3).map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="text-base leading-7 text-neutral-800">
                                    <div className="items-bottom justify-left mb-3 flex h-16 w-16 rounded-lg bg-transparent">
                                        <i
                                            className={`${feature.icon} text-5xl text-secondary-600`}
                                        />
                                    </div>
                                    <h3 className="font-display text-lg font-bold">
                                        {feature.name}
                                    </h3>
                                </dt>
                                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-neutral-800">
                                    <p className="flex-auto">
                                        {feature.description}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
