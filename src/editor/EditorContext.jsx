import { useNotificationContext } from './NotificationContext'

const { createContext, useState, useContext, useEffect } = require('react')

const EditorContext = createContext({
    global: {
        data: {},
        change: () => {},
        cancel: () => {},
    },
    page: {
        name: '',
        data: {},
        change: () => {},
        cancel: () => {},

        add: () => {},
        adding: () => false,
        delete: () => {},
        deleting: () => false,
    },
    components: {
        data: {},
        change: () => {},
        cancel: () => {},

        generate: () => {},
        generating: () => false,

        add: () => {},
        move: () => {},
        delete: () => {},

        visible: () => false,
        open: () => {},
        close: () => {},

        nested: {
            add: () => {},
            delete: () => {},
        },
    },

    is_saving: false,
    has_updates: false,

    save: () => {},
    revert: () => {},
})

export function useEditorContext() {
    return useContext(EditorContext)
}

export function EditorContextProvider(props) {
    const {
        children,
        page_name,
        global_data: input_global_data,
        page_data: input_page_data,
        components: input_components,
    } = props

    const notifications = useNotificationContext()

    // state for the global.json file
    const [saved_global_data, setSavedGlobalData] = useState(input_global_data)
    const [global_data, setGlobalData] = useState(input_global_data)

    // state for the current page file
    const [saved_page_data, setSavedPageData] = useState(input_page_data)
    const [page_data, setPageData] = useState(input_page_data)
    const [adding_page, setAddingPage] = useState(false)
    const [deleting_page, setDeletingPage] = useState(false)

    // state for the components on the current page
    const [saved_components, setSavedComponents] = useState(input_components)
    const [components, setComponents] = useState(input_components)

    const [component_editor_open_index, setComponentEditorOpenIndex] =
        useState(null)
    const [component_generating, setComponentGenerating] = useState({})

    // state for the save buttons
    const [is_saving, setIsSaving] = useState(false)
    const [has_updates, setHasUpdates] = useState(false)

    /**
     * If the components prop changes, check if there are updates
     * If there are updates, set the has_updates state to true
     * Otherwise, set it to false
     */
    useEffect(() => {
        if (
            JSON.stringify(components) !== JSON.stringify(saved_components) ||
            JSON.stringify(page_data) !== JSON.stringify(saved_page_data) ||
            JSON.stringify(global_data) !== JSON.stringify(saved_global_data)
        ) {
            setHasUpdates(true)
        } else {
            setHasUpdates(false)
        }
    }, [
        components,
        saved_components,
        page_data,
        saved_page_data,
        global_data,
        saved_global_data,
    ])

    //==========================================================================//
    //============================= GLOBAL CONTEXT =============================//
    //==========================================================================//

    /**
     * Handles the change of a global variable e.g. logo
     * @param {string} arg.key - The key of the global variable
     * @param {string} arg.value - The value of the global variable
     */
    const handleGlobalDataChange = ({ key, value }) => {
        setGlobalData((prev) => ({ ...prev, [key]: value }))
    }

    /**
     * Reverts any changes made to the global data
     */
    const handleUndoGlobalDataChanges = () => {
        setGlobalData(saved_global_data)
    }

    //==========================================================================//
    //============================== PAGE CONTEXT ==============================//
    //==========================================================================//

    /**
     * Handles the change of a global variable e.g. logo
     * @param {string} arg.key - The key of the global variable
     * @param {string} arg.value - The value of the global variable
     */
    const handlePageDataChange = ({ key, value }) => {
        setPageData((prev) => ({ ...prev, [key]: value }))
    }

    /**
     * Reverts any changes made to the page data
     */
    const handleUndoPageDataChanges = () => {
        setPageData(saved_page_data)
    }

    /**
     * Adds a new page
     */
    const handleAddPage = async ({ page_type, path }) => {
        setAddingPage(true)
        try {
            const response = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/addPage',
                // 'http://localhost:3003/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company_id: global_data.company_id,
                        page: page_type,
                        path: path,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            notifications.push({
                title: 'Page successfully added!',
                message:
                    'Wait for the site to be rebuilt and refresh the page.',
                variant: 'success',
                ttl: 10,
            })
        } catch (error) {
            notifications.push({
                title: 'Failed to add page!',
                variant: 'error',
                ttl: 20,
                error,
            })
        } finally {
            setAddingPage(false)
        }
    }

    /**
     * Deletes the current page
     */
    const handleDeletePage = async () => {
        setDeletingPage(true)
        try {
            const response = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/deletePage',
                // 'http://localhost:3014',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company_id: global_data.company_id,
                        path: page_name,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            notifications.push({
                title: 'Page successfully deleted!',
                message:
                    'Wait for the site to be rebuilt and refresh the page.',
                variant: 'success',
                ttl: 10,
            })
        } catch (error) {
            notifications.push({
                title: 'Failed to delete page!',
                variant: 'error',
                ttl: 20,
                error,
            })
        } finally {
            setDeletingPage(false)
        }
    }

    //==========================================================================//
    //=============================== COMPONENTS ===============================//
    //==========================================================================//

    /**
     * Handles the change of a global variable e.g. logo
     * @param {string} arg.file - The file name for the component data
     * @param {string | null} arg.key - The key of the global variable
     * @param {string | Object} arg.value - The value of the global variable
     */
    const handleComponentDataChange = ({ file, key, value }) => {
        // find the component in the list of components
        const index = components.findIndex(
            (component) => component.data_file === file
        )
        const component = components[index]

        // create a deep clone of the component so that state isn't mutated
        const updated_component = structuredClone(component)

        /**
         * If a key is provided, update the value at that key
         * Otherwise, replace the component data with the new value
         */
        if (key) {
            /**
             * Convert object dot notated key to an array of keys
             * e.g. "services[0].serviceName" -> ["services", 0, "serviceName"]
             */
            const keys = key.replace(/\[(\d+)\]/g, '.$1').split('.')

            // create a reference to the object
            let current = updated_component.props
            for (const k of keys.slice(0, -1)) {
                // iterate the keys updating the reference to the nested property
                current = current[k]
            }

            // using the reference, update the value in updateData
            current[keys[keys.length - 1]] = value
        } else {
            // replace the component data with the new value
            updated_component.props = value
        }

        // create a copy of the components array
        const new_components = [...components]

        // update the component in the array
        new_components[index] = updated_component

        // this should be obvious if you understand the previous part
        setComponents(new_components)
    }

    /**
     * Calls the generate content API to generate content for a component
     * - if the key is null generate content for the whole component instead of a specific key
     * @param {string} arg.component_name - The name of the component
     * @param {string | undefined} arg.key - The key of the component
     * @param {string | undefined} arg.prompt - Optional prompt to use for generation
     * @param {string | undefined} arg.temperature - Optional temperature to use for generation
     */
    const handleGenerateComponentData = async ({
        file,
        component_name,
        key,
        prompt,
        include_page_context,
    }) => {
        setComponentGenerating((prev) => ({
            ...prev,
            [`${file}-${key}`]: true,
        }))

        try {
            const response = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/generateContent',
                // 'http://localhost:3008',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        company_id: global_data.company_id,
                        componentName: component_name,
                        instructions: prompt,
                        include_page_context,
                        pagename: page_name,
                        key,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const data = await response.json()

            handleComponentDataChange({
                file,
                key,
                value: key ? data[key] : data,
            })

            notifications.push({
                title: 'Content successfully generated!',
                message: `Component: ${component_name} - Field: ${key}`,
                variant: 'success',
                ttl: 10,
            })
        } catch (error) {
            notifications.push({
                title: 'Failed to generate content!',
                message: `Component: ${component_name} - Field: ${key}`,
                variant: 'error',
                ttl: 20,
                error,
            })
        } finally {
            setComponentGenerating((prev) => ({
                ...prev,
                [`${file}-${key}`]: false,
            }))
        }
    }

    /**
     * Determine if a component is currently generating data
     */
    const isComponentGeneratingData = ({ file, key }) => {
        return component_generating[`${file}-${key}`]
    }

    /**
     * Moves a component up or down in the list of components
     * @param {number} arg.index - the index of the component to move
     * @param {1 | -1} arg.above_or_below - -1 to move the component up, 1 to move it down
     */
    const handleMoveComponent = ({ index, above_or_below }) => {
        /**
         * Prevent moving the first component up
         * - nav is always first in the list so prevent moving the 2nd component up
         */
        if (index === 1 && above_or_below === -1) {
            return
        }

        /**
         * Prevent moving the last component down
         * - footer is always last in the list so prevent moving the 2nd last component down
         */
        if (index === components.length - 2 && above_or_below === 1) {
            return
        }

        const new_components = [...components]

        // remove the component at the index
        const component = new_components.splice(index, 1)[0]

        // insert the component at the new index
        new_components.splice(index + above_or_below, 0, component)

        setComponents(new_components)
    }

    /**
     * Adds a component to the page
     * @param {number} arg.index - the index to add the component at
     * @param {string} arg.component_name - the name of the component to add
     */
    const handleAddComponent = async ({ index, component_name }) => {
        let schema = {}

        // get default props from the schema file
        try {
            schema =
                await require(`../components/${component_name}.schema.json`)
        } catch (e) {
            // some files don't have props therefor no schema file
            console.error(e)
        }

        // strip out all but the value keys
        const default_props = Object.keys(schema).reduce((props, prop_name) => {
            props[prop_name] = schema[prop_name].value

            return props
        }, {})

        // create a new file name, appending an int for duplicates
        // TODO - edge case when multiple components exist then a component is deleted and then a new one is added
        let file_name = component_name.toLowerCase()
        const num_duplicates = components.filter((component) =>
            component.data_file.startsWith(file_name)
        ).length

        if (num_duplicates > 0) {
            file_name = `${file_name}-${num_duplicates}`
        }

        // create the new component object
        const new_components = [...components]
        const new_component = {
            data_file: `${file_name}.json`,
            name: component_name,
            props: default_props,
        }

        // add the new component to the list of components
        new_components.splice(index, 0, new_component)

        setComponents(new_components)
    }

    /**
     * Removes a component from the page
     * @param {number} arg.index - the index of the component to remove
     */
    const handleDeleteComponent = ({ index }) => {
        const new_components = [...components]

        new_components.splice(index, 1)

        setComponents(new_components)
    }

    /**
     * Reverts any changes made to the component data
     */
    const handleUndoComponentDataChanges = () => {
        setComponentEditorOpenIndex(null)
        setComponents(saved_components)
    }

    /**
     * Opens the component editor for a component at a given index
     * @param {number} args.index - the index of the component
     */
    const handleOpenComponentEditor = ({ index }) => {
        setComponentEditorOpenIndex(index)
    }

    /**
     * Closes the component editor and maintains any changes made
     */
    const handleCloseComponentEditor = () => {
        setComponentEditorOpenIndex(null)
    }

    /**
     * Returns if the component editor is visible for the given component index
     * @param {number} arg.index - the index of the component
     */
    const isComponentEditorVisible = ({ index }) => {
        return index === component_editor_open_index
    }

    //==========================================================================//
    //============================ NESTED COMPONENTS ===========================//
    //==========================================================================//

    /**
     * Adds a item to an array in a component
     * - Adds an item by creating a copy of an existing item in the array
     * - e.g. adding a service to the services array in the services component
     * @param {string} args.file - the file name of the component
     * @param {string} args.key - the key of the array in the component
     * @param {number} args.index - the index where the item gets added
     */
    const handleAddComponentNestedData = ({ file, key, index }) => {
        // find the component in the list of components
        const component_index = components.findIndex(
            (component) => component.data_file === file
        )
        const component = components[component_index]

        // create a deep clone of the component so that state isn't mutated
        const updated_component = structuredClone(component)

        /**
         * Convert object dot notated key to an array of keys
         * e.g. "services[0].serviceName" -> ["services", 0, "serviceName"]
         */
        const keys = key.replace(/\[(\d+)\]/g, '.$1').split('.')

        // create a reference to the object
        let current = updated_component.props
        for (const k of keys) {
            // iterate the keys updating the reference to the nested property
            current = current[k]
        }

        // insert a copy (not a reference) of the previous item at the index
        current.splice(
            index,
            0,
            structuredClone(current[Math.max(index - 1, 0)])
        )

        // create a copy of the components array
        const new_components = [...components]

        // update the component in the array
        new_components[component_index] = updated_component

        setComponents(new_components)
    }

    const handleDeleteComponentNestedData = ({ file, key }) => {
        // find the component in the list of components
        const component_index = components.findIndex(
            (component) => component.data_file === file
        )
        const component = components[component_index]

        // create a deep clone of the component so that state isn't mutated
        const updated_component = structuredClone(component)

        /**
         * Convert object dot notated key to an array of keys
         * e.g. "services[0].serviceName" -> ["services", 0, "serviceName"]
         */
        const keys = key.replace(/\[(\d+)\]/g, '.$1').split('.')

        // create a reference to the object
        let current = updated_component.props
        for (const k of keys.slice(0, -1)) {
            // iterate the keys updating the reference to the nested property
            current = current[k]
        }

        // get the index of the item to remove
        const index = Number.parseInt(keys[keys.length - 1])

        // remove the item from the array
        current.splice(index, 1)

        // create a copy of the components array
        const new_components = [...components]

        // update the component in the array
        new_components[component_index] = updated_component

        setComponents(new_components)
    }

    //==========================================================================//
    //================================= COMMON =================================//
    //==========================================================================//

    /**
     * Saves the manifest and any public static json files
     * - updates the saved_components state
     * - sets the is_saving state to true while saving
     * - clears the has_updates state when done
     */
    const handleSave = async () => {
        setIsSaving(true)

        let data = {}

        /**
         * Determine if components have been added, removed, or reordered
         * and update the manifest file if necessary
         */
        const saved_manifest = {
            page_name,
            // remove the nav and footer
            components: saved_components.slice(1, -1).map((component) => ({
                slug: component.data_file.replace('.json', ''),
                component_key: component.name,
            })),
        }

        const manifest = {
            page_name,
            // remove the nav and footer
            components: components.slice(1, -1).map((component) => ({
                slug: component.data_file.replace('.json', ''),
                component_key: component.name,
            })),
        }

        if (JSON.stringify(manifest) !== JSON.stringify(saved_manifest)) {
            data.manifest = manifest
        }

        /**
         * Determine if any components have been added, updated, or removed
         * and update the public static json files if necessary
         */
        const components_to_update = components.filter((component) => {
            const saved_component = saved_components.find(
                (saved_component) =>
                    saved_component.data_file === component.data_file
            )

            // if the component doesn't exist in the saved_components array, it's new
            if (!saved_component) {
                return true
            }

            // if the component exists in the saved_components array, check if it's been updated
            return (
                JSON.stringify(component.props) !==
                JSON.stringify(saved_component.props)
            )
        })

        // determine which components have been deleted
        const components_to_delete = saved_components.filter(
            (saved_component) =>
                !components.find(
                    (component) =>
                        component.data_file === saved_component.data_file
                )
        )

        /**
         * Determine if the page data has been updated
         * and update the public static json file if necessary
         */
        if (JSON.stringify(page_data) !== JSON.stringify(saved_page_data)) {
            components_to_update.push({
                data_file: 'page.json',
                props: page_data,
            })
        }

        /**
         * Determine if the global data has been updated
         */
        if (JSON.stringify(global_data) !== JSON.stringify(saved_global_data)) {
            components_to_update.push({
                data_file: 'globals.json',
                props: global_data,
            })
        }

        /**
         * Add the updates to the request data payload
         */
        data.components_to_update = components_to_update
        data.components_to_delete = components_to_delete

        if (
            !data.manifest &&
            !data.components_to_update.length &&
            !data.components_to_delete.length
        ) {
            console.log('No changes to save')

            setHasUpdates(false)
            setIsSaving(false)

            return
        }

        try {
            const response = await fetch(
                `https://us-central1-labs-ai-sites.cloudfunctions.net/updatePage`,
                // `http://localhost:3010/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company_id: global_data.company_id,
                        page_name,
                        data,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            setHasUpdates(false)
            setSavedComponents(components)
            setSavedPageData(page_data)
            setSavedGlobalData(global_data)

            notifications.push({
                title: 'Page saved successfully!',
                variant: 'success',
                ttl: 10,
            })
        } catch (error) {
            notifications.push({
                title: 'Failed to save changes!',
                variant: 'error',
                ttl: 20,
                error,
            })
        } finally {
            setIsSaving(false)
        }
    }

    /**
     * Reverts any changes made to the global, page, and component data
     */
    const handleRevertChanges = () => {
        setGlobalData(saved_global_data)
        setPageData(saved_page_data)
        setComponents(saved_components)
    }

    return (
        <EditorContext.Provider
            value={{
                global: {
                    data: global_data,
                    change: handleGlobalDataChange,
                    cancel: handleUndoGlobalDataChanges,
                },
                page: {
                    name: page_name,
                    data: page_data,
                    change: handlePageDataChange,
                    cancel: handleUndoPageDataChanges,

                    add: handleAddPage,
                    adding: adding_page,
                    delete: handleDeletePage,
                    deleting: deleting_page,
                },
                components: {
                    data: components,
                    change: handleComponentDataChange,
                    cancel: handleUndoComponentDataChanges,

                    generate: handleGenerateComponentData,
                    generating: isComponentGeneratingData,

                    add: handleAddComponent,
                    move: handleMoveComponent,
                    delete: handleDeleteComponent,

                    open: handleOpenComponentEditor,
                    close: handleCloseComponentEditor,
                    visible: isComponentEditorVisible,

                    nested: {
                        add: handleAddComponentNestedData,
                        delete: handleDeleteComponentNestedData,
                    },
                },

                is_saving,
                has_updates,

                save: handleSave,
                revert: handleRevertChanges,
            }}
        >
            {children}
        </EditorContext.Provider>
    )
}
