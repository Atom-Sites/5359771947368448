export default function ReviewHero(props) {
    const { listOnly, Header, Icon, Reviews, CTA} = props

    if (!Reviews) {
        return <div>failed to load</div>
    }

    if (listOnly) {
        return Reviews.map((Review, index) => (
            <div key={Review.Author.handle + index}>
                <figure>
                    <blockquote>
                        {Review.Body}
                    </blockquote>
                    <figcaption>
                        <img src={Review.Author.Icon} alt={Review.Author.Source}/>
                        {Review.Author.Name}
                    </figcaption>
                </figure>
            </div>
        ))
    }

    return (
        <section className="editable-component relative isolate overflow-hidden bg-primary-900 px-6 py-24 sm:py-32 lg:px-8" data-json="reviewhero" >
            {Reviews.map((Review, index) => (
                <div key={Review.Author.handle + index} className="mx-auto max-w-2xl lg:max-w-4xl">
                    {/*Header Medium and Stars*/}
                    <div className="text-center">
                        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl sm:leading-tight">
                            {Header}
                        </h2>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <i className={`${Icon} mx-1 sm:text-lg lg:text-xl text-yellow-500`}/>
                        <i className={`${Icon} mx-1 sm:text-lg lg:text-xl text-yellow-500`}/>
                        <i className={`${Icon} mx-1 sm:text-lg lg:text-xl text-yellow-500`}/>
                        <i className={`${Icon} mx-1 sm:text-lg lg:text-xl text-yellow-500`}/>
                        <i className={`${Icon} mx-1 sm:text-lg lg:text-xl text-yellow-500`}/>
                    </div>

                    {/*Bold Review*/}
                    <figure className="mt-10 items-center justify-center">
                        <blockquote className="text-center sm:text-lg lg:text-xl leading-8 text-white sm:leading-9">
                            <p>“{Review.Body}”</p>
                        </blockquote>

                        {/*Name and Source*/}
                        <figcaption className="mt-10">
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <img className="h-8 w-8 rounded-full bg-neutral-50 p-1" src={Review.Author.Icon} alt={Review.Author.Icon}/>
                                <div className="text-white">
                                    {Review.Author.Name}
                                </div>
                            </div>
                        </figcaption>
                    </figure>

                    {/* CTA */}
                    <div className="mt-10 flex items-center justify-center">
                        <div className="flex items-center">
                            <a className="font-heading focus-visible:transparent rounded-2xl bg-transparent px-4 py-3 text-base font-bold text-white shadow-sm ring-1 ring-inset ring-white transition-all ease-in hover:bg-white hover:bg-opacity-10 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2" href="/reviews">
                               {CTA}
                            </a>
                        </div>
                    </div>

                </div>
            ))}
        </section>
    )
}
