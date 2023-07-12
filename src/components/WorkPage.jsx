export const DEFAULT_PROPS = {}

export default function WorkPage() {
    return (
        <>
            {/*Hero for secondary pages*/}
            <div className="bg-primary-100">
                <div className="relative px-6  lg:px-8">
                    <div className="mx-auto max-w-2xl py-24 lg:py-32">
                        <div className="text-center">
                            <h1 className="text-4xl font-display font-semibold tracking-tight text-neutral-800 lg:text-6xl">
                                Our Latest Projects
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-neutral-800">
                                Check out some of our newest projects to peek at
                                our capabilities. Our team is committed to
                                providing quality work that meets the highest
                                standards, and our portfolio speaks for itself.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/*Gallery*/}
                    <div className="mx-auto flow-root max-w-2xl lg:mx-0 lg:max-w-none">
                        <div
                            className="nj-stories"
                            data-filter-media="show"
                            data-branding="bottom"
                        ></div>

                        {/* Regular CTA*/}
                        <div className="mt-10 flex items-center justify-center">
                            <div className="flex items-center">
                                <a className="nj-lead font-heading focus-visible:transparent rounded-2xl bg-primary-700 px-4 py-3 text-base font-bold text-white shadow-sm transition-all ease-in hover:bg-primary-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                                    Get started today!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
