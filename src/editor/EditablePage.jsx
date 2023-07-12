'use client'
import { EditableComponent } from './EditableComponent'
import { EditorContextProvider, useEditorContext } from './EditorContext'
import GlobalEditor from './GlobalEditor'
import { GoogleFontLoader } from './GoogleFontLoader'
import { NotificationContextProvider } from './NotificationContext'

/**
 * Manages the page level state for the editor
 * - moving components up and down
 * - adding components
 * - deleting components
 * - saving the manifest
 *
 * @param {String} props.page_name - the name of the page
 * @param {Object} props.company_data - the company data
 * @param {Object} props.nav_data - the nav data
 * @param {Object} props.footer_data - the footer data
 */
export function EditablePage(props) {
    const { page_name, company_data, page_data, components } = props

    return (
        <NotificationContextProvider>
            <GoogleFontLoader />
            <EditorContextProvider
                page_name={page_name}
                global_data={company_data}
                page_data={page_data}
                components={components}
            >
                <GlobalEditor />

                <EditablePageWithContext page_name={page_name} />
            </EditorContextProvider>
        </NotificationContextProvider>
    )
}

function EditablePageWithContext(props) {
    const { page_name } = props

    const editor = useEditorContext()

    return editor.components.data.map((component, index) => (
        <EditableComponent
            key={component.data_file}
            index={index}
            page_name={page_name}
        />
    ))
}
