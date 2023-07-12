import makeId from '@/utils/makeId'

export default function Services(props) {
    const { Services } = props

    if (!Services) {
        return <div>failed to load</div>
    }

    return (
        <div data-json="services">
            {Services.map((Service, index) => {
                if (index % 2 == 0) {
                    return <ServiceLeft key={index} {...Service} />
                } else {
                    return <ServiceRight key={index} {...Service} />
                }
            })}
        </div>
    )
}

{
}
function ServiceLeft(props) {
    const { Tagline, Anchor, Header, Body, ImageUrl, AltText, Features, CTA } =
        props

    return (
        <div
            id={makeId(Anchor)}
            className="overflow-hidden bg-primary-50 px-6 py-24 sm:py-32 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                {/*Feature Grid*/}
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                    {/* Image */}
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <img
                            className="h-[250px] w-[800px] rounded-xl object-cover shadow-xl ring-neutral-400/10 sm:h-[350px] lg:h-[500px]"
                            src={ImageUrl}
                            alt={AltText}
                            loading="lazy"
                        />
                    </div>
                    <div className="px-6 md:px-0">
                        <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
                            <h2 className="text-base font-bold uppercase leading-7 tracking-wide text-primary-800">
                                {Tagline}
                            </h2>
                            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-neutral-800 md:text-3xl lg:text-4xl ">
                                {Header}
                            </h2>
                            <p className="mt-6 text-lg leading-7 text-neutral-800">
                                {Body}
                            </p>
                            <dl className="mt-10 max-w-xl space-y-5 text-base leading-7 text-neutral-800 lg:max-w-none">
                                {Features.map((feature) => (
                                    <Feature key={feature.name} {...feature} />
                                ))}
                            </dl>
                            {/* Regular CTA */}
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
        </div>
    )
}

{
    /*Right Service*/
}
function ServiceRight(props) {
    const { Tagline, Anchor, Header, Body, ImageUrl, AltText, Features, CTA } =
        props

    return (
        <div
            id={makeId(Anchor)}
            className="overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                {/* Feature Grid */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                    {/* Image */}
                    <div className="mx-auto max-w-2xl lg:order-last lg:mx-0 ">
                        <img
                            className="h-[250px] w-[800px] rounded-xl object-cover shadow-xl ring-neutral-400/10 sm:h-[350px] lg:h-[500px]"
                            src={ImageUrl}
                            alt={AltText}
                            loading="lazy"
                        />
                    </div>

                    <div className="mx-auto max-w-2xl lg:ml-0 lg:max-w-lg">
                        <h2 className="text-base  font-bold uppercase leading-7 tracking-wide text-primary-800">
                            {Tagline}
                        </h2>
                        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-neutral-800 md:text-3xl lg:text-4xl ">
                            {Header}
                        </h2>
                        <p className="mt-6 text-lg leading-7 text-neutral-800">
                            {Body}
                        </p>
                        <dl className="mt-10 max-w-xl space-y-5 text-base leading-7 text-neutral-800 lg:max-w-none">
                            {Features.map((feature) => (
                                <Feature key={feature.name} {...feature} />
                            ))}
                        </dl>
                        {/* Regular CTA */}
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
    )
}

function Feature(props) {
    const { Icon, name, description } = props

    return (
        <div className="relative pl-9">
            <dt className="inline font-bold text-secondary-700">
                <i className={`${Icon} absolute left-1 top-0.5 text-2xl`} />
                <span className="font-bold">{name} </span>
            </dt>
            <dd>{description}</dd>
        </div>
    )
}
