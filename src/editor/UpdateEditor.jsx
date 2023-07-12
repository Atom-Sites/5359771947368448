import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { version } from './version.js'

export function UpdateEditor(props) {
    const { company_id } = props

    const [hasUpdated, setHasUpdated] = useState(false)

    const handleUpdateEditor = async () => {
        console.log('Updating editor for company', company_id)
        try {
            const response = await fetch(
                'https://us-central1-labs-ai-sites.cloudfunctions.net/updateEditor',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        company_id: company_id,
                        version: version,
                    }),
                }
            )

            if (response.ok) {
                setHasUpdated(true)
                alert(await response.text())
            } else {
                console.error('Error updating the editor')
            }
        } catch (error) {
            console.error('Error updating the editor', error)
        }
    }

    if (hasUpdated) {
        return null
    }

    return (
        <button
            type="button"
            className="focus-visible:transparent relative inline-flex items-center gap-x-1.5 rounded-full bg-neutral-200 px-2 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-all ease-in hover:bg-yellow-200 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2"
            onClick={handleUpdateEditor}
        >
            <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
        </button>
    )
}
