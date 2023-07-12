import {
    ArrowDownIcon,
    ArrowUpIcon,
    PlusIcon,
    SparklesIcon,
} from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useEditorContext } from './EditorContext'
import { EditorDrawer } from './EditorDrawer'
import { ImageUpload } from './ImageUpload'

const IMAGE_REGEX = /\.(?:png|jpg|jpeg|webp|svg|gif|ico)$/i

export default function ComponentEditor(props) {
    const {
        component_props,
        file,
        componentName,
        open,
        onSave,
        onClose,
        onCancel,
        onChange,
    } = props

    const editor = useEditorContext()

    const { company_id } = editor.global.data

    const handleInputChange = (event, key) => {
        onChange({ file, key, value: event.target.value })
    }

    const renderInput = (value, key, level = 0) => {
        const is_array = Array.isArray(value)
        const is_object =
            typeof value === 'object' && !is_array && value !== null

        const containerClassName = `mb-2 ${
            is_array || is_object ? `ml-${level * 4}` : ''
        }`

        /**
         * Some components require global data as a props e.g. the nav component
         * uses the company logo. Prevent editing these props at the component level.
         */
        if (key === 'company') {
            return null
        }

        if (is_array) {
            return (
                <div key={key + level} className={containerClassName}>
                    {value.map((item, index) => (
                        <div key={key + index}>
                            {renderInput(item, `${key}[${index}]`, level)}

                            <div key={key} className="flex">
                                <div className="mb-2 mr-2 mt-4 h-0.5 w-full border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                                <button
                                    type="button"
                                    className="focus-visible:transparent relative inline-flex items-center gap-x-1.5 rounded-full bg-neutral-200 px-2 py-2 text-sm font-semibold text-blue-950 shadow-sm transition-all ease-in hover:bg-green-400 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                                    onClick={() =>
                                        editor.components.nested.add({
                                            file,
                                            key,
                                            index: index + 1,
                                        })
                                    }
                                >
                                    <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                                <div className="mb-2 ml-2 mt-4 h-0.5 w-full border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                            </div>
                        </div>
                    ))}
                </div>
            )
        }

        if (is_object) {
            const is_parent_array = new RegExp(/\[\d+\]$/).test(key)

            let index
            if (is_parent_array) {
                index = key.match(/\[(\d+)\]$/)[1]
            }

            return (
                <div key={key} className={containerClassName}>
                    <strong className="mb-2 block font-semibold">{key}:</strong>

                    {is_parent_array && index && (
                        <div className="flex">
                            <div className="mb-2 mr-2 mt-4 h-0.5 w-full border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                            <button
                                type="button"
                                className="focus-visible:transparent relative inline-flex items-center gap-x-1.5 rounded-full bg-neutral-200 px-2 py-2 text-sm font-semibold text-neutral-950 shadow-sm transition-all ease-in hover:bg-red-400 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                                onClick={() =>
                                    editor.components.nested.delete({
                                        file,
                                        key,
                                        index: index,
                                    })
                                }
                            >
                                <TrashIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                            <div className="mb-2 ml-2 mt-4 h-0.5 w-full border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        </div>
                    )}

                    {Object.entries(value).map(([nestedKey, nestedValue]) =>
                        renderInput(
                            nestedValue,
                            `${key}.${nestedKey}`,
                            level + 1
                        )
                    )}
                </div>
            )
        }

        const is_image = new RegExp(IMAGE_REGEX).test(value)

        return (
            <div key={key} className={containerClassName}>
                <>
                    <PromptInput
                        label={
                            <label className="mt-2 block text-xs font-medium leading-6 text-neutral-400">
                                {key}
                            </label>
                        }
                        file={file}
                        componentName={componentName}
                        element={key}
                    />
                </>
                {is_image ? (
                    <div className="flex flex-col items-center justify-between">
                        <div className="mt-2">
                            <img
                                className="max-h-48 w-full rounded-lg object-cover"
                                src={value}
                                alt={value}
                            />
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <label className="mt-3 block text-xs font-medium leading-6 text-neutral-400">
                                File Upload
                            </label>
                        </div>

                        <ImageUpload
                            company_id={company_id}
                            file={file}
                            element={key}
                            onChange={onChange}
                        />
                    </div>
                ) : (
                    <div className="mt-1">
                        <textarea
                            rows={2}
                            className="block w-full rounded-md border-0 py-1.5 text-sm  leading-6 text-neutral-800 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-blue-500"
                            value={value}
                            onChange={(e) => handleInputChange(e, key)}
                        />
                    </div>
                )}
            </div>
        )
    }

    if (!component_props) {
        return null
    }

    return (
        <EditorDrawer
            title="Component Editor"
            open={open}
            onClose={onClose}
            onCancel={onCancel}
            onSave={() => {
                onSave()
                onClose()
            }}
        >
            <PromptInput
                label={
                    <label className="block text-base font-bold leading-6 text-blue-500 ">
                        {componentName}
                    </label>
                }
                file={file}
                componentName={componentName}
            />

            {Object.entries(component_props).map(([key, value]) =>
                renderInput(value, key)
            )}
        </EditorDrawer>
    )
}

function PromptInput(props) {
    const { label, file, componentName, element: key } = props

    const editor = useEditorContext()
    const loading = editor.components.generating({ file, key })

    const [open, setOpen] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [include_page_context, setIncludePageContext] = useState(false)

    return (
        <div>
            <div className="mt-2 flex items-center justify-between">
                {label}
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        className="focus-visible:transparent current:text-primary-700 mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-400 transition-all ease-in hover:bg-neutral-50 hover:text-green-400 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                        onClick={() => {
                            setOpen(!open)
                            setPrompt('')
                        }}
                    >
                        {open ? (
                            <ArrowUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <ArrowDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        )}
                    </button>

                    <button
                        type="button"
                        className="focus-visible:transparent current:text-primary-700 mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-400 transition-all ease-in hover:bg-neutral-50 hover:text-green-400 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                        disabled={loading}
                        onClick={() =>
                            editor.components.generate({
                                file,
                                component_name: componentName,
                                key,
                                prompt,
                                include_page_context,
                            })
                        }
                    >
                        {loading ? (
                            <svg
                                aria-hidden="true"
                                className="inline h-5 w-5 animate-spin fill-green-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        ) : (
                            <SparklesIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        )}
                    </button>
                </div>
            </div>

            {open && (
                <div className="bor mb-2 flex flex-col gap-2">
                    <textarea
                        rows={2}
                        className="block w-full rounded-md border-0 py-1.5 text-sm  leading-6 text-neutral-800 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-blue-500"
                        placeholder="Enter prompt here..."
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
                    />
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            value=""
                            className="peer sr-only"
                            checked={include_page_context}
                            onChange={() => {
                                setIncludePageContext(!include_page_context)
                            }}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-1 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Include Page Data in Context
                        </span>
                    </label>
                </div>
            )}
        </div>
    )
}
