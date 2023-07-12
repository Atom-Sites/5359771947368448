import React, { useEffect, useState } from 'react'
import { ConfirmationModal } from './ConfirmationModal.jsx'
import { useEditorContext } from './EditorContext.jsx'
import { EditorDrawer } from './EditorDrawer.jsx'
import { DISPLAY_FONTS, TEXT_FONTS } from './GoogleFontLoader.jsx'
import { ImageUpload } from './ImageUpload.jsx'
import { LoadingSpinner } from './LoadingSpinner.jsx'
import { useNotificationContext } from './NotificationContext.jsx'

const RBG_HEX_REGEX = /^#[0-9A-F]{6}$/i
const VARIANTS = ['primary', 'secondary']
const SHADES = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
]

const FONT_FAMILIES = ['display', 'text']

export function SiteSettingsEditor(props) {
    const { open, onClose } = props

    const editor = useEditorContext()
    const { company_id } = editor.global.data

    const notifications = useNotificationContext()

    const [colors, setColors] = useState({})
    const [hasColorsChanged, setHasColorsChanged] = useState({
        primary: false,
        secondary: false,
    })
    const [regenerating, setRegenerating] = useState({
        primary: false,
        secondary: false,
    })

    const [savedFonts, setSavedFonts] = useState({})
    const [fonts, setFonts] = useState({})

    const [favicon, setFavicon] = useState('')
    const [saving_favicon, setSavingFavicon] = useState(false)
    const [favicon_saved, setFaviconSaved] = useState(false)

    const [saved_custom_code, setSavedCustomCode] = useState({
        head: '',
        footer: '',
    })
    const [custom_code, setCustomCode] = useState({
        head: '',
        footer: '',
    })
    const [getting_tags, setGettingTags] = useState(true)
    const [saving_tags, setSavingTags] = useState(false)
    const [tag_error, setTagError] = useState(false)

    const [confirmationModal, setConfirmationModal] = useState(null)
    const [confirmationLoading, setConfirmationLoading] = useState(null)

    useEffect(() => {
        const initialColors = {}
        const initialFonts = {}

        VARIANTS.forEach((variant) => {
            SHADES.forEach((shade) => {
                initialColors[`${variant}-${shade}`] = getComputedStyle(
                    document.documentElement
                ).getPropertyValue(`--${variant}-${shade}`)
            })
        })

        FONT_FAMILIES.forEach((fontFamily) => {
            initialFonts[fontFamily] = getComputedStyle(
                document.documentElement
            )
                .getPropertyValue(`--ff-${fontFamily}`)
                .replace(/\"/g, '')
        })

        setColors(initialColors)

        setFonts(initialFonts)
        setSavedFonts(initialFonts)
    }, [])

    useEffect(() => {
        const getCustomTags = async () => {
            try {
                const response = await fetch(
                    'https://us-central1-labs-ai-sites.cloudfunctions.net/getCustomCode',
                    // `http://localhost:3013/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            company_id: company_id,
                        }),
                    }
                )

                if (response.ok) {
                    const data = await response.json()

                    setCustomCode(data)
                    setSavedCustomCode(data)
                } else {
                    throw new Error('Failed to get tags')
                }
            } catch (error) {
                console.error(error)
                setTagError(true)
            }
        }

        getCustomTags().then(() => {
            setGettingTags(false)
        })
    }, [])

    /**
     * Handles the color change from the color picker or the text input
     * @param {'primary' | 'secondary'} variant - the color variant to update
     * @returns {(event: any) => void} - the event handler function, updates the colors state and css variable
     */
    const handleColorChange = (variant) => async (event) => {
        // get the color value
        const color = event.target.value.toUpperCase()

        if (new RegExp(RBG_HEX_REGEX).test(color)) {
            setHasColorsChanged((prev) => ({
                ...prev,
                [variant]: true,
            }))

            await regenerateColorPalette({ variant, color })
        }
    }

    /**
     * Handles the color palette regeneration using tints.dev
     * - using the 700 shade regenerate the rest of the palette
     * @param {'primary' | 'secondary'} variant - the color variant to update
     */
    const regenerateColorPalette = async ({ variant, color }) => {
        setRegenerating((prev) => ({ ...prev, [variant]: true }))

        try {
            const response = await fetch(
                `https://us-central1-labs-ai-sites.cloudfunctions.net/generateColorPalette`,
                // `http://localhost:3009/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        color,
                    }),
                }
            )

            if (!response.ok) {
                alert('Color palette regeneration failed!')

                return
            }

            const data = await response.json()

            const updatedColors = {}
            Object.entries(data).forEach(([shade, colorValue]) => {
                updatedColors[`${variant}-${shade}`] = colorValue

                document.documentElement.style.setProperty(
                    `--${variant}-${shade}`,
                    colorValue
                )
            })

            setColors((prevColors) => ({
                ...prevColors,
                ...updatedColors,
            }))
        } catch (error) {
            console.error(error)
            alert('Color palette regeneration failed!')
        } finally {
            setRegenerating((prev) => ({ ...prev, [variant]: false }))
        }
    }

    /**
     * If the colors or fonts have changed, save the theme
     */
    const handleSaveTheme = async () => {
        if (
            !hasColorsChanged.primary &&
            !hasColorsChanged.secondary &&
            JSON.stringify(savedFonts) === JSON.stringify(fonts)
        ) {
            console.log('No theme changes to save')

            return
        }

        try {
            const response = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/updateTheme',
                // `http://localhost:3005/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        company_id: company_id,
                        data: {
                            colors,
                            fonts,
                        },
                    }),
                }
            )

            if (response.ok) {
                console.log('Theme saved successfully!')

                setHasColorsChanged({
                    primary: false,
                    secondary: false,
                })
                setSavedFonts(fonts)
            } else {
                alert('Theme update failed!')
            }
        } catch (error) {
            console.error(error)
            alert('Theme uploading error!')
        }
    }

    const handleFontChange = (fontFamily) => async (event) => {
        const font = event.target.value

        setFonts((prev) => ({
            ...prev,
            [fontFamily]: font,
        }))

        document.documentElement.style.setProperty(
            `--ff-${fontFamily}`,
            `"${font}"`
        )
    }

    const handleFaviconUpload = async (event) => {
        setSavingFavicon(true)
        setFaviconSaved(false)

        // get the image from the input
        const image = event.target.files[0]

        // convert the image to a base64 string
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = async () => {
            setFavicon(reader.result)

            try {
                const response = await fetch(
                    'https://us-central1-labs-ai-sites.cloudfunctions.net/generateFavicon',
                    // `http://localhost:3011/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            company_id: company_id,
                            company_name: editor.global.data.company_name,
                            image: reader.result,
                        }),
                    }
                )

                if (response.ok) {
                    setFaviconSaved(true)
                } else {
                    alert('Favicon update failed!')
                }
            } catch (error) {
                console.error(error)
            } finally {
                setSavingFavicon(false)
            }
        }

        reader.onerror = () => {
            alert(`Error uploading the favicon`)
        }
    }

    const handleSaveCustomTags = async () => {
        if (JSON.stringify(saved_custom_code) === JSON.stringify(custom_code)) {
            console.log('No custom code changes to save')
            return
        }

        setSavingTags(true)

        try {
            const response = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/updateCustomCode',
                // `http://localhost:3012/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company_id: company_id,
                        data: {
                            head: custom_code?.head ? custom_code.head : null,
                            footer: custom_code?.footer
                                ? custom_code.footer
                                : null,
                        },
                    }),
                }
            )

            if (response.ok) {
                setSavedCustomCode(custom_code)
            } else {
                alert('Failed to save custom code!')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSavingTags(false)
        }
    }

    const unsafeUpdateComponents = async () => {
        setConfirmationLoading('components')
        try {
            const response = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/unsafeUpdateComponents',
                // `http://localhost:3015/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company_id: company_id,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(
                    `Failed to update components: ${response.status} ${response.statusMessage}`
                )
            }

            notifications.push({
                title: 'Components successfully updated!',
                message:
                    'Wait for the site to be rebuilt and refresh the page.',
                variant: 'success',
                ttl: 10,
            })
        } catch (error) {
            notifications.push({
                title: 'Failed to update components!',
                variant: 'error',
                ttl: 20,
                error,
            })
        } finally {
            setConfirmationModal(null)
            setConfirmationLoading(null)
        }
    }

    const regenerateSite = async () => {
        try {
            console.log('Regenerating site...')
            const response = await fetch(
                'https://ai-ui-agent-ytnjkd5upa-uc.a.run.app/enqueue',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        company_id,
                        domain: '', // TODO - add the actual domain
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(
                    `Failed to regenerate site: ${response.status} ${response.statusMessage}`
                )
            }

            notifications.push({
                title: 'Site successfully regenerated!',
                message:
                    'Wait for the site to be rebuilt and refresh the page.',
                variant: 'success',
            })
        } catch (error) {
            notifications.push({
                title: 'Failed to regenerate the site!',
                variant: 'error',
                error,
            })
        } finally {
            setConfirmationModal(null)
            setConfirmationLoading(null)
        }
    }

    return (
        <EditorDrawer
            title="Site Editor"
            open={open}
            onClose={onClose}
            onCancel={() => {
                editor.global.cancel()
                setFavicon(null)
                setSavingFavicon(false)
                setFaviconSaved(false)
                setCustomCode(saved_custom_code)
                onClose()
            }}
            onSave={() => {
                handleSaveCustomTags()
                handleSaveTheme()
                editor.save()
                onClose()
            }}
        >
            <div className="my-2 ">
                <label className="block text-base font-bold leading-6 text-blue-500 ">
                    Favicon
                </label>
            </div>

            <div className="mb-2 flex items-center gap-2">
                <img
                    src={favicon || '/icons/favicon.ico'}
                    alt="favicon"
                    className="h-12 w-12"
                />

                {saving_favicon && (
                    <>
                        <label className="text-sm font-medium text-gray-700">
                            Generating Favicon
                        </label>
                        <LoadingSpinner />
                    </>
                )}

                {favicon_saved && !saving_favicon && (
                    <label className="text-sm font-medium text-gray-700">
                        Favicon Updated ✅
                    </label>
                )}
            </div>

            <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none disabled:cursor-default"
                id="favicon_input"
                type="file"
                accept="image/svg+xml, image/png, image/jpeg"
                onChange={handleFaviconUpload}
                disabled={saving_favicon}
            />

            <div className="my-2 ">
                <label className="block text-base font-bold leading-6 text-blue-500 ">
                    Logo
                </label>
            </div>

            <ImageUpload
                company_id={company_id}
                file="globals.json"
                element="logoUrl"
                onChange={editor.global.change}
            />

            <div className="my-4 border-b-2" />

            <label className="block text-base font-bold leading-6 text-blue-500 ">
                Theme
            </label>

            <label className="block text-base leading-6 text-neutral-500">
                Color Palette
            </label>

            <div className="flex items-center gap-2">
                <label className="mt-2 block flex-1 text-xs font-medium leading-6 text-neutral-400">
                    Primary
                    <span className="ml-2">
                        {regenerating.primary && <LoadingSpinner />}
                    </span>
                </label>

                <label className="mt-2 block flex-1 text-xs font-medium leading-6 text-neutral-400">
                    Secondary
                    <span className="ml-2">
                        {regenerating.secondary && <LoadingSpinner />}
                    </span>
                </label>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1">
                    <input
                        type="color"
                        id="primary700-picker"
                        name="primary700-picker"
                        className="h-12 w-12 rounded-md bg-white"
                        defaultValue={colors['primary-700']}
                        onBlur={handleColorChange('primary')}
                    />
                    <input
                        type="text"
                        id="primary700-input"
                        name="primary700-input"
                        className={`focus-visible:transparent current:text-primary-700 w-28 flex-1 rounded-md bg-white text-neutral-600 transition-all ease-in hover:bg-neutral-50 hover:text-neutral-800 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2`}
                        value={colors['primary-700']}
                        onChange={handleColorChange('primary')}
                        onClick={(event) => event.target.select()}
                    />
                </div>

                <div className="flex flex-1 items-center gap-1">
                    <input
                        type="color"
                        id="secondary700-picker"
                        name="secondary700-picker"
                        className="h-12 w-12 rounded-md bg-white"
                        defaultValue={colors['secondary-700']}
                        onBlur={handleColorChange('secondary')}
                    />
                    <input
                        type="text"
                        id="secondary700-input"
                        name="secondary700-input"
                        className={`focus-visible:transparent current:text-secondary-700 w-28 flex-1 rounded-md bg-white text-neutral-600 transition-all ease-in hover:bg-neutral-50 hover:text-neutral-800 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2`}
                        value={colors['secondary-700']}
                        onChange={handleColorChange('secondary')}
                        onClick={(event) => event.target.select()}
                    />
                </div>
            </div>

            <div className="my-4 border-b-2" />

            <label className="block text-base leading-6 text-neutral-500">
                Font Family
            </label>

            <div className="flex items-center gap-2">
                <label className="mt-2 block flex-1 text-xs font-medium leading-6 text-neutral-400">
                    Display
                    <span className="ml-2">
                        {regenerating.primary && <LoadingSpinner />}
                    </span>
                </label>

                <label className="mt-2 block flex-1 text-xs font-medium leading-6 text-neutral-400">
                    Text
                    <span className="ml-2">
                        {regenerating.secondary && <LoadingSpinner />}
                    </span>
                </label>
            </div>

            <div className="flex items-center gap-2">
                <select
                    className="h-16 w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    value={fonts.display}
                    onChange={handleFontChange('display')}
                >
                    {DISPLAY_FONTS.map(({ font }) => (
                        <option key={`${font}-display`} value={font}>
                            {font}
                        </option>
                    ))}
                </select>

                <select
                    className="h-16 w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    value={fonts.text}
                    onChange={handleFontChange('text')}
                >
                    {TEXT_FONTS.map(({ font }) => (
                        <option key={`${font}-text`} value={font}>
                            {font}
                        </option>
                    ))}
                </select>
            </div>

            <div className="my-4 border-b-2" />

            <label className="block text-base font-bold leading-6 text-blue-500 ">
                Custom Code
            </label>

            {tag_error && (
                <div className="mt-2 text-sm text-red-600">
                    Failed to get custom
                </div>
            )}

            <label className="mt-2 block flex-1 text-xs font-medium leading-6 text-neutral-400">
                Head
            </label>
            <div className="relative my-2">
                {(saving_tags || getting_tags) && (
                    <div className="absolute left-[48%] top-[42%]">
                        <LoadingSpinner />
                    </div>
                )}
                <textarea
                    rows={6}
                    className="block w-full rounded-md border-0 py-1.5 text-sm  leading-6 text-neutral-800 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 disabled:text-neutral-300"
                    value={custom_code.head}
                    onChange={(e) =>
                        setCustomCode((prev) => ({
                            ...prev,
                            head: e.target.value,
                        }))
                    }
                    disabled={saving_tags || getting_tags || tag_error}
                />
            </div>

            <label className="mt-2 block flex-1 text-xs font-medium leading-6 text-neutral-400">
                Footer
            </label>
            <div className="relative my-2">
                {(saving_tags || getting_tags) && (
                    <div className="absolute left-[48%] top-[42%]">
                        <LoadingSpinner />
                    </div>
                )}
                <textarea
                    rows={6}
                    className="block w-full rounded-md border-0 py-1.5 text-sm  leading-6 text-neutral-800 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 disabled:text-neutral-300"
                    value={custom_code.footer}
                    onChange={(e) =>
                        setCustomCode((prev) => ({
                            ...prev,
                            footer: e.target.value,
                        }))
                    }
                    disabled={saving_tags || getting_tags || tag_error}
                />
            </div>

            <div className="my-4 border-b-2" />

            <div className="mb-2">
                <label className="block text-base font-bold leading-6 text-orange-500 ">
                    Danger Zone
                </label>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                    onClick={() => {
                        setConfirmationModal('components')
                    }}
                >
                    Get Latest Components
                </button>

                <button
                    className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                    onClick={() => {
                        setConfirmationModal('regenerate')
                    }}
                >
                    Regenerate Site
                </button>
            </div>

            <ConfirmationModal
                variant="danger"
                title="Get latest components from the template"
                message="This will overwrite all the components for this site using the latest from the template. The latest components are not guaranteed to work with this site's data files. Are you sure?"
                prompt="Update"
                open={confirmationModal === 'components'}
                onClose={() => setConfirmationModal(null)}
                onConfirm={unsafeUpdateComponents}
                loading={confirmationLoading === 'components'}
            />

            <ConfirmationModal
                variant="danger"
                title="Regenerate the site"
                message="This will regenerate all the data for the site. Any manual changes will be lost. Are you sure?"
                prompt="Regenerate"
                open={confirmationModal === 'regenerate'}
                onClose={() => setConfirmationModal(null)}
                onConfirm={regenerateSite}
                loading={confirmationLoading === 'regenerate'}
            />
        </EditorDrawer>
    )
}
