import component_registry from '@/components/component_registry'
import { fetchDataForComponent } from '@/utils/fetchDataForComponent'
import layout_manifest from '../../app/layout-manifest.json'

const nav = layout_manifest.components.find((v) => v.component_key === 'Nav')
const footer = layout_manifest.components.find(
    (v) => v.component_key === 'Footer'
)

const Nav = component_registry[nav['component_key']]
const Footer = component_registry[footer['component_key']]

export async function PageContent(props) {
    const { manifest, page_name } = props

    const promises = [
        fetchDataForComponent({ data_file: 'nav.json' }),
        fetchDataForComponent({ data_file: 'footer.json' }),
        fetchDataForComponent({ data_file: 'globals.json' }),
        (async () => {
            const result = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/branding'
            )
            return await result.json()
        })(),
    ]

    const componentPromises = []
    manifest.forEach((component) => {
        componentPromises.push(
            fetchDataForComponent({
                data_file: component.data_file,
                pagename: page_name,
            })
        )
    })

    const data = await Promise.all(componentPromises)
    const [nav_props, footer_props, company_data, brand_data] =
        await Promise.all(promises)

    return (
        <>
            <Nav {...nav_props} company={company_data} />

            {manifest.map((item, index) => (
                <item.component key={item.data_file} {...data[index]} />
            ))}

            <Footer {...footer_props} brand={brand_data} />
        </>
    )
}
