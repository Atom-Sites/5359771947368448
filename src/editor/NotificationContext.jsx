import { Transition } from '@headlessui/react'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Fragment, createContext, useContext, useEffect, useState } from 'react'

const NotificationContext = createContext({
    push: () => {},
})

export function useNotificationContext() {
    return useContext(NotificationContext)
}

export function NotificationContextProvider(props) {
    const [notifications, setNotifications] = useState([])

    /**
     * Adds a notification to the list of notifications
     * @param {*} notification - the notification to add
     */
    const handlePushNotification = (notification) => {
        setNotifications([...notifications, notification])
    }

    /**
     * Removes a notification from the list of notifications
     * @param {number} index - the index of the notification to remove
     */
    const handleDismissNotification = (index) => {
        const new_notifications = [...notifications]
        new_notifications.splice(index, 1)

        setNotifications(new_notifications)
    }

    return (
        <NotificationContext.Provider value={{ push: handlePushNotification }}>
            {props.children}
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 z-[100] flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {notifications.map((notification, index) => (
                        <Notification
                            key={notification.title}
                            onClose={() => handleDismissNotification(index)}
                            {...notification}
                        />
                    ))}
                </div>
            </div>
        </NotificationContext.Provider>
    )
}

function Notification(props) {
    const { title, message, variant, ttl, error, onClose } = props

    const [running, setRunning] = useState(!!ttl)
    const [progress, setProgress] = useState(0)

    let interval

    /**
     * If the notification has a ttl, start the interval
     */
    useEffect(() => {
        if (running) {
            interval = setInterval(() => {
                setProgress((prev) => prev + 0.05)
            }, 100)
        } else {
            clearInterval(interval)
        }
    }, [running])

    /**
     * If the progress bar is full, stop the timer and close the notification
     */
    useEffect(() => {
        if (progress >= ttl) {
            setRunning(false)
            clearInterval(interval)
            onClose()
        }
    }, [progress])

    /**
     * If an error is passed, log it to the console
     * - Useful for debugging and removes the need to push a notification
     *   and console.error for every error.
     */
    useEffect(() => {
        if (error) {
            console.error(error)
        }
    }, [error])

    /**
     * Closes the notification and clears the interval
     */
    const handleClose = () => {
        if (interval) {
            clearInterval(interval)
        }
        onClose()
    }

    return (
        <Transition
            show
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                    <div
                        className={`flex ${
                            message ? 'items-start' : 'items-center'
                        }`}
                    >
                        <div className="flex-shrink-0">
                            {variant === 'error' ? (
                                <ExclamationCircleIcon
                                    className="h-6 w-6 text-red-700"
                                    aria-hidden="true"
                                />
                            ) : (
                                <CheckCircleIcon
                                    className="h-6 w-6 text-green-700"
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {title}
                            </p>

                            {message && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {message}
                                </p>
                            )}
                        </div>
                        <div className="ml-4 flex flex-shrink-0">
                            <button
                                type="button"
                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={handleClose}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                    {ttl && (
                        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                            <div
                                className="h-1.5 rounded-full bg-neutral-400"
                                style={{
                                    width: `${Math.min(
                                        (progress / ttl) * 100,
                                        100
                                    )}%`,
                                    transition: 'width 100ms ease-in',
                                }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>
        </Transition>
    )
}
