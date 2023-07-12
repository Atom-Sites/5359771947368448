import component_registry from '@/components/component_registry'

export const parseManifest = (manifest) => {
    return {
        page_name: manifest.page_name,
        parsed_manifest: manifest.components.map((v) => {
            return {
                component: component_registry[v.component_key],
                data_file: v.slug + '.json',
                name: v.component_key,
            }
        })
    }
}

