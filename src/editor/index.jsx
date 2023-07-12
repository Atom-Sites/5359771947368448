import dynamic from 'next/dynamic'
import { PageContent } from './PageContent'

const DynamicPageContentEditable = dynamic(() =>
    import('./PageContentEditable').then((mod) => mod.PageContentEditable)
)

export async function Page(props) {
    const { is_edit_mode } = props

    if (is_edit_mode) {
        /**
         * Fetch the data on the server, render the components on the client
         * to maintain editing state
         */
        return (
            <DynamicPageContentEditable
                page_name={props.page_name}
                manifest={props.manifest}
            />
        )
    } else {
        /**
         * Render as much as possible on the server to improve performance
         */
        return (
            <PageContent
                page_name={props.page_name}
                manifest={props.manifest}
            />
        )
    }
}
