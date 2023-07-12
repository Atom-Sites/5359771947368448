'use client'
export default function Team(props) {
    const { Header, Body, People } = props

    if (!Header || !People) {
        return <div>failed to load</div>
    }

    const renderedPeople = People?.length ? People : []

    return (
        <section className="editable-component relative isolate overflow-hidden bg-secondary-100 px-6 py-24 sm:py-32 lg:px-8" data-json="team">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                {/* Section Intro Center */}
                <div className="text-center">
                    <h2 className="text-2xl font-display font-semibold tracking-tight text-neutral-800 md:text-3xl lg:text-4xl">
                        {Header}
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-neutral-800">
                        {Body}
                    </p>
                </div>

                {/* Team */}
                <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {renderedPeople.map(({ Person }) => (
                        <li key={Person.Name}>
                            <img className="mx-auto h-56 w-56 rounded-full object-cover " src={Person.ImageURL} alt={Person.Name} loading="lazy"/>
                            <h3 className="mt-6 font-display text-center text-base font-semibold leading-7 tracking-tight text-primary-700">
                                {Person.Name}
                            </h3>
                            <p className="text-center text-sm leading-6 text-neutral-800">
                                {Person.Role}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
