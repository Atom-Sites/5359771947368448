export default function Recommend() {
    return (
        <section className="editable-component relative isolate overflow-hidden bg-primary-800 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                {/*Section Intro Center Large Paragraph*/}
                <div className="text-center">
                    <h2 className="text-2xl font-display font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                        Recommend your experience!
                    </h2>
                    <p className="text-l mt-10 leading-8 text-white sm:text-xl sm:leading-9">
                        Tell your family and friends about us after experiencing
                        our fantastic work firsthand. We rely on word-of-mouth
                        advertising to grow our business and are always happy to
                        help.
                    </p>
                </div>

                {/* Regular CTA*/}
                <div className="mt-10 flex items-center justify-center">
                    <div className="flex items-center">
                        <a
                            className="nj-recommendation font-heading focus-visible:transparent rounded-2xl bg-transparent px-4 py-3 text-base font-bold text-white shadow-sm ring-1 ring-inset ring-white transition-all ease-in hover:bg-white hover:bg-opacity-10 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                            href="#"
                        >
                            Recommend us!
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
