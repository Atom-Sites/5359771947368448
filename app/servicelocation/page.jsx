import { Page } from '@/editor'
import { metadata } from '@/utils/metadata'
import { parseManifest } from '@/utils/parseManifest'
import manifest from './component-manifest.json'

const { page_name, parsed_manifest } = parseManifest(manifest)

export async function generateMetadata({ params }) {
    return metadata(page_name)
}

export default async function ServiceLocation(props) {
    const { searchParams } = props
    const is_edit_mode = !!searchParams?.edit

    return (
        <Page
            manifest={parsed_manifest}
            page_name={page_name}
            is_edit_mode={is_edit_mode}
        />
    )
}
