export default function SatisfactionGuarantee(props) {
    const { Icon, Header, Body } = props

    if (!Header || !Body) {
        return <div>failed to load</div>
    }

    return (
        <section className="editable-component relative bg-secondary-700 px-6 py-24 lg:px-8 lg:py-32" data-json="satisfactionguarantee">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <i className={`${Icon} mx-1 sm:text-lg lg:text-4xl text-white`}/>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-white lg:text-4xl">
                    {Header}
                </h2>
                <p className="mt-6 text-lg leading-8 text-white">
                    {Body}
                </p>
            </div>
        </section>
    )
}
