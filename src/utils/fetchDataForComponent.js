import { headers } from 'next/headers';

/**
 * Fetches the data for a page from the data file.
 * @param {string} data_file - The name of the data file to fetch from.
 * @param {string} page_name - The name of the page to fetch data for.
 * @returns {object} The data for the page.
 */
export async function fetchDataForComponent({ data_file, pagename }) {
    const headersList = headers();
    const header_url = headersList.get('x-url') || "";

    const origin = new URL(header_url).origin;

    let url = `${origin}/api/staticdata?filename=${data_file}`
    if (pagename) {
        url += `&pagename=${pagename}`
    }

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (!data) {
            return null
        }

        return data
    } catch (error) {
        console.error(error)
        return {}
    }
}