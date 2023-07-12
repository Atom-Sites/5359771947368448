import makeId from '@/utils/makeId'

export default function SecondaryServices(props) {
    const { Services, CTA } = props

    if (!Services || !CTA ) {
        return <div>failed to load</div>
    }

    return (
        <div data-json="secondaryservices"> 
            <div className="overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-3 lg:items-start">
                        {Services.map((Service, index) => { 
                            {return <SecondaryService key={index} {...Service} />
                        }
                        })}
                    </div>

                    {/* CTA */}
                    <div className="justify-center mt-10 flex items-center">
                        <div className="flex items-center">
                            <a className="nj-lead font-heading focus-visible:transparent rounded-2xl bg-primary-700 px-4 py-3 text-base font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                                {CTA}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SecondaryService (props) {
    const { Service, Anchor, Header, Body, ImageUrl, AltText, } = props

    return (
        <div id={makeId(Anchor)}  className="mx-auto max-w-2xl lg:mx-0">
            <img className="h-[250px] w-[800px] rounded-xl object-cover shadow-xl ring-neutral-400/10" src={ImageUrl} alt={AltText} loading="lazy"/>
            <h2 className="mt-8 text-base font-bold uppercase leading-7 tracking-wide text-primary-600">
                {Service}
            </h2>
            <h2 className="mt-2 text-xl font-display font-bold tracking-tight text-neutral-800">
                {Header}
            </h2>
            <p className="mt-6 text-base leading-7 text-neutral-800">
                {Body}
            </p>
        </div>
    )
}