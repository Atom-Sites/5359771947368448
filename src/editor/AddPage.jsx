import { classNames } from '@/utils/classNames'
import { Listbox, Transition } from '@headlessui/react'
import {
    CheckIcon,
    ChevronDownIcon,
    PhotoIcon,
    SparklesIcon,
} from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { useEditorContext } from './EditorContext'
import { EditorDrawer } from './EditorDrawer'
import { LoadingSpinner } from './LoadingSpinner'

const pageSelection = [
    {
        title: 'Landing Page',
        description: 'A Service or Location LP.',
        current: true,
        pageType: 'servicelocation',
        defaultPath: 'location',
    },
    {
        title: 'FAQ',
        description: 'Ideal page for the FAQs.',
        current: false,
        pageType: 'faq',
        defaultPath: 'faq',
    },
    // TODO allow adding a blank page
    // {
    //     title: 'Blank Page',
    //     description: 'Start fresh for any custom page.',
    //     current: false,
    // },
]

export function AddPage(props) {
    const { open, onClose, company_id } = props

    const editor = useEditorContext()

    const [selected, setSelected] = useState(pageSelection[0])
    const [path, setPath] = useState(pageSelection[0].defaultPath)

    const handlePathChange = (event) => {
        setPath(event.target.value)
    }

    const handlePageChange = (page) => {
        const current = selected

        setSelected(page)

        // update the path if it hasn't changed from the default value
        if (current.defaultPath === path) {
            setPath(page.defaultPath)
        }
    }

    return (
        <EditorDrawer
            title="Add Page"
            open={open}
            onClose={onClose}
            onSave={() => {
                if (!editor.page.adding) {
                    editor.page
                        .add({
                            page_type: selected.pageType,
                            path: path,
                        })
                        .then(() => {
                            onClose()
                        })
                }
            }}
        >
            {editor.page.adding && (
                <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-[#14141440]">
                    <LoadingSpinner size="large" />
                </div>
            )}
            <div className="mt-2 flex items-center justify-between">
                <label className="block text-base font-bold leading-6 text-blue-500 ">
                    Page Settings
                </label>
            </div>
            {/* Page Title*/}
            {/* TODO provide a page title on page creation */}
            {false && (
                <>
                    <div className="flex items-center justify-between">
                        <label className="mt-2 block text-xs font-medium leading-6 text-neutral-400">
                            Title
                        </label>
                        <button
                            type="button"
                            className="focus-visible:transparent current:text-primary-700 mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-400 transition-all ease-in hover:bg-neutral-50 hover:text-green-400 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                        >
                            <SparklesIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <div className="mt-1">
                        <textarea
                            rows={1}
                            className="block w-full rounded-md border-0 py-1.5 text-sm  leading-6 text-neutral-800 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-blue-500"
                            defaultValue={'Text from AI'}
                        />
                    </div>
                </>
            )}
            {/* Page URL*/}
            <div className="flex items-center justify-between">
                <label className="mt-2 block text-xs font-medium leading-6 text-neutral-400">
                    URL
                </label>
            </div>
            <div className="mt-1">
                <textarea
                    rows={1}
                    className="block w-full rounded-md border-0 py-1.5 text-sm  leading-6 text-neutral-800 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-blue-500"
                    value={path}
                    onChange={handlePathChange}
                />
            </div>

            {/* Page Meta Description*/}
            {/* TODO provide a meta description */}
            {false && (
                <>
                    <div className="flex items-center justify-between">
                        <label className="mt-2 block text-xs font-medium leading-6 text-neutral-400">
                            Meta Description
                        </label>
                        <button
                            type="button"
                            className="focus-visible:transparent current:text-primary-700 mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-400 transition-all ease-in hover:bg-neutral-50 hover:text-green-400 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                        >
                            <SparklesIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    <div className="mt-1">
                        <textarea
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-sm  leading-6 text-neutral-800 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-blue-500"
                            defaultValue={'Text from AI'}
                        />
                    </div>
                </>
            )}

            {/* Image Upload */}
            {/* TODO meta image upload */}
            {false && (
                <>
                    <div className="my-8">
                        <div>
                            {/* Divider */}
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        {/* Item */}
                        <div className="mt-3 flex items-center justify-between">
                            <label className="block text-base font-bold leading-6 text-blue-500 ">
                                Page Image
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="mt-3 block text-xs font-medium leading-6 text-neutral-400">
                                File Upload
                            </label>
                        </div>

                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="focus-visible:transparent current:text-primary-700 relative cursor-pointer rounded-md bg-white  font-semibold text-blue-500 transition-all ease-in hover:text-blue-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Small Text Box */}
            <div className="my-8">
                <div>
                    <div className="mt-6 w-full border-t border-neutral-200" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <label className="block text-base font-bold leading-6 text-blue-500 ">
                        Style
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <label className="mt-2 block text-xs font-medium leading-6 text-neutral-400">
                        Page Style Selection
                    </label>
                </div>

                <div className="mt-3">
                    <Listbox value={selected} onChange={handlePageChange}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">
                                    Change published status
                                </Listbox.Label>
                                <div className="relative">
                                    <div className="inline-flex divide-x divide-white rounded-md shadow-sm">
                                        <div className="w-fullitems-center inline-flex gap-x-1.5 rounded-l-md bg-blue-500 px-3 py-2 text-white shadow-sm">
                                            <CheckIcon
                                                className="-ml-0.5 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            <p className="text-sm font-semibold">
                                                {selected.title}
                                            </p>
                                        </div>
                                        <Listbox.Button className="rounded-l- focus-visible:transparent inline-flex items-center rounded-2xl rounded-r-full bg-blue-500 p-2 pr-3 font-bold transition-all ease-in hover:bg-blue-600 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2">
                                            <span className="sr-only">
                                                Change published status
                                            </span>
                                            <ChevronDownIcon
                                                className="h-5 w-5 text-white"
                                                aria-hidden="true"
                                            />
                                        </Listbox.Button>
                                    </div>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {pageSelection.map((option) => (
                                                <Listbox.Option
                                                    key={option.title}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active
                                                                ? 'bg-blue-500 text-white'
                                                                : 'text-gray-900',
                                                            'cursor-default select-none p-4 text-sm'
                                                        )
                                                    }
                                                    value={option}
                                                >
                                                    {({ selected, active }) => (
                                                        <div className="flex flex-col">
                                                            <div className="flex justify-between">
                                                                <p
                                                                    className={
                                                                        selected
                                                                            ? 'font-semibold'
                                                                            : 'font-normal'
                                                                    }
                                                                >
                                                                    {
                                                                        option.title
                                                                    }
                                                                </p>
                                                                {selected ? (
                                                                    <span
                                                                        className={
                                                                            active
                                                                                ? 'text-white'
                                                                                : 'text-blue-500'
                                                                        }
                                                                    >
                                                                        <CheckIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'text-blue-200'
                                                                        : 'text-neutral-400',
                                                                    'mt-2'
                                                                )}
                                                            >
                                                                {
                                                                    option.description
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>
            </div>
        </EditorDrawer>
    )
}
