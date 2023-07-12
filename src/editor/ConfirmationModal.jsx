import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Fragment, useRef } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

export function ConfirmationModal(props) {
    const {
        open,
        onClose,
        onConfirm,
        title,
        message,
        prompt,
        variant,
        loading,
        icon,
    } = props

    const primaryButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[100]"
                initialFocus={primaryButtonRef}
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div
                                        className={`${
                                            variant === 'danger'
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-green-100 text-green-600'
                                        } mx-auto flex h-12 w-12 items-center justify-center rounded-full `}
                                    >
                                        {loading ? (
                                            <LoadingSpinner
                                                size="medium"
                                                color={
                                                    variant === 'danger'
                                                        ? 'fill-red-600'
                                                        : 'fill-green-600'
                                                }
                                            />
                                        ) : icon || variant === 'danger' ? (
                                            <ExclamationTriangleIcon
                                                className="h-6 w-6 "
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className={`${
                                            variant === 'danger'
                                                ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-red-300'
                                                : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-indigo-300'
                                        } inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  sm:col-start-2`}
                                        onClick={onConfirm}
                                        disabled={loading}
                                    >
                                        {prompt}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-100 sm:col-start-1 sm:mt-0"
                                        onClick={onClose}
                                        ref={primaryButtonRef}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
