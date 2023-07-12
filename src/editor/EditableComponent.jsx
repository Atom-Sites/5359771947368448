'use client'
import Components from '@/components/component_registry'
import {
    ArrowDownIcon,
    ArrowUpIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'
import { useState } from 'react'
import ComponentEditor from './ComponentEditor'
import { useEditorContext } from './EditorContext'

/**
 * Manages the component level state for the editor
 */
export function EditableComponent(props) {
    const { index, page_name } = props

    const editor = useEditorContext()

    const component = editor.components.data[index]

    const [is_add_menu_open, setIsAddMenuOpen] = useState(false)
    const [new_component_index, setNewComponentIndex] = useState(0)

    const toggleDropdown = () => {
        setIsAddMenuOpen(!is_add_menu_open)
    }

    const is_movable =
        component.data_file !== 'nav.json' &&
        component.data_file !== 'footer.json'

    if (!component.name) {
        return <div>Invalid Component: {JSON.stringify(component)}</div>
    }

    const Component = Components[component.name]

    return (
        <div className="edit-component-wrapper group relative">
            <ComponentEditor
                file={component.data_file}
                componentName={component.name}
                open={editor.components.visible({ index })}
                component_props={component.props}
                onChange={editor.components.change}
                onCancel={editor.components.cancel}
                onClose={editor.components.close}
                onSave={editor.save}
            />

            <div className="invisible absolute inset-0 z-20 flex shrink-0 items-center border-b border-t border-dashed border-gray-300 group-hover:visible">
                {is_movable && (
                    <button
                        className="absolute -top-5 left-1/2 z-40 -translate-x-1/2 transform rounded bg-black px-4 py-2 text-white opacity-100 hover:bg-gray-900"
                        onClick={() => {
                            setNewComponentIndex(index)
                            toggleDropdown()
                        }}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                )}

                {is_movable && (
                    <button
                        className="absolute -bottom-5 left-1/2 z-40 -translate-x-1/2 transform rounded bg-black px-4 py-2 text-white opacity-100 hover:bg-gray-900 "
                        onClick={() => {
                            setNewComponentIndex(index + 1)
                            toggleDropdown()
                        }}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                )}

                <div className="ml-8 inline-flex shrink-0 flex-col items-center space-y-4 rounded bg-black/50 p-8">
                    {is_movable && (
                        <button
                            className="rounded bg-black p-4 text-white opacity-100 hover:bg-gray-900"
                            title="Move Up"
                            onClick={() =>
                                editor.components.move({
                                    index,
                                    above_or_below: -1,
                                })
                            }
                        >
                            <ArrowUpIcon className="h-6 w-6" />
                        </button>
                    )}

                    {is_movable && (
                        <button
                            className="rounded bg-black p-4 text-white opacity-100 hover:bg-gray-900"
                            title="Move Down"
                            onClick={() =>
                                editor.components.move({
                                    index,
                                    above_or_below: 1,
                                })
                            }
                        >
                            <ArrowDownIcon className="h-6 w-6" />
                        </button>
                    )}

                    <button
                        className="rounded bg-blue-500 p-4 text-white opacity-100 hover:bg-blue-600 disabled:bg-neutral-400"
                        title={'Edit'}
                        onClick={() => editor.components.open({ index })}
                    >
                        <PencilIcon className="h-6 w-6" />
                    </button>

                    {is_movable && (
                        <button
                            className="rounded bg-red-500 p-4 text-white opacity-100 hover:bg-red-600"
                            title="Delete"
                            onClick={() => editor.components.delete({ index })}
                        >
                            <TrashIcon className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>

            {is_add_menu_open && (
                <div className="fixed left-1/2 top-1/2 z-50 mt-2 -translate-x-1/2 -translate-y-1/2 transform space-y-2 rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="flex w-full flex-row-reverse px-2 pt-2">
                        <div className="">
                            <button
                                type="button"
                                className="focus-visible:transparent current:text-primary-700 ml-1 rounded-md bg-white text-gray-400 transition-all ease-in hover:text-gray-500 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                                onClick={toggleDropdown}
                            >
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="w-64 px-4 pb-6">
                        <label
                            for="components"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Select an option:
                        </label>
                        <select
                            id="components"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            onChange={(e) => {
                                if (e.target.value !== 'Choose a component') {
                                    editor.components.add({
                                        index: new_component_index,
                                        component_name: e.target.value,
                                    })
                                    toggleDropdown()
                                }
                            }}
                        >
                            <option selected>Choose a component</option>
                            {Object.keys(Components)
                                .sort()
                                .filter(
                                    (componentName) =>
                                        componentName !== 'Nav' &&
                                        componentName !== 'Footer'
                                )
                                .map((componentName) => (
                                    <option value={componentName}>
                                        {componentName}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            )}
            <Component
                {...component.props}
                {...(component.name === 'Nav'
                    ? { company: editor.global.data }
                    : null)}
            />
        </div>
    )
}
