'use client'

export default function AboutPageHero(props) {
    const { Header, Intro } = props
    
    if (!Header || !Intro ) {
        return <div>failed to load</div>
    }

    return (
        <div className="bg-primary-100">
            <div className="relative px-6  lg:px-8">
                <div className="mx-auto max-w-2xl py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-display font-bold tracking-tight text-neutral-800 lg:text-6xl">
                            {Header}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-800">
                            {Intro}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
