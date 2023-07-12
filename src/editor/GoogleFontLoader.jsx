'use client'
import { useEffect } from 'react'

export const DISPLAY_FONTS = [
    { font: 'Arvo', weights: [400, 500, 600, 700, 800] },
    { font: 'Chewy', weights: [400, 500, 600, 700, 800] },
    { font: 'Cinzel', weights: [400, 500, 600, 700, 800] },
    { font: 'Cormorant Garamond', weights: [400, 500, 600, 700, 800] },
    { font: 'Karla', weights: [400, 500, 600, 700, 800] },
    { font: 'Lexend', weights: [400, 500, 600, 700, 800] },
    { font: 'Libre Baskerville', weights: [400, 500, 600, 700, 800] },
    { font: 'Lora', weights: [400, 500, 600, 700, 800] },
    { font: 'Lustria', weights: [400, 500, 600, 700, 800] },
    { font: 'Montserrat', weights: [400, 500, 600, 700, 800] },
    { font: 'Nixie One', weights: [400, 500, 600, 700, 800] },
    { font: 'Nunito', weights: [400, 500, 600, 700, 800] },
    { font: 'Open Sans', weights: [400, 500, 600, 700, 800] },
    { font: 'Oswald', weights: [400, 500, 600, 700, 800] },
    { font: 'Oxygen', weights: [400, 500, 600, 700, 800] },
    { font: 'Philosopher', weights: [400, 500, 600, 700, 800] },
    { font: 'Playfair Display', weights: [400, 500, 600, 700, 800] },
    { font: 'Poppins', weights: [400, 500, 600, 700, 800] },
    { font: 'Quicksand', weights: [400, 500, 600, 700, 800] },
    { font: 'Raleway', weights: [400, 500, 600, 700, 800] },
    { font: 'Roboto Condensed', weights: [400, 500, 600, 700, 800] },
    { font: 'Sacramento', weights: [400, 500, 600, 700, 800] },
    { font: 'Sora', weights: [400, 500, 600, 700, 800] },
    { font: 'Work Sans', weights: [400, 500, 600, 700, 800] },
]

export const TEXT_FONTS = [
    { font: 'Andika', weights: [400, 500, 600] },
    { font: 'EB Garamond', weights: [400, 500, 600] },
    { font: 'Inter', weights: [400, 500, 600] },
    { font: 'Jesefin Sans', weights: [400, 500, 600] },
    { font: 'Lato', weights: [400, 500, 600] },
    { font: 'Montserrat', weights: [400, 500, 600] },
    { font: 'Nunito Sans', weights: [400, 500, 600] },
    { font: 'Open Sans', weights: [400, 500, 600] },
    { font: 'Poppins', weights: [400, 500, 600] },
    { font: 'Proza Libre', weights: [400, 500, 600] },
    { font: 'Quicksand', weights: [400, 500, 600] },
    { font: 'Roboto', weights: [400, 500, 600] },
]

const createLink = (fonts) => {
    const families = fonts
        .reduce((acc, font) => {
            const family = font.font.replace(/ +/g, '+')
            const weights = (font.weights || []).join(';')

            return [...acc, family + (weights && `:wght@${weights}`)]
        }, [])
        .join('&family=')

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${families}`

    return link
}

export const GoogleFontLoader = () => {
    useEffect(() => {
        const fonts = [...DISPLAY_FONTS]
        TEXT_FONTS.forEach((font) => {
            if (!fonts.find((f) => f.font === font.fonts)) {
                fonts.push(font)
            }
        })

        const link = createLink(fonts)

        document.head.appendChild(link)

        return () => document.head.removeChild(link)
    }, [])

    return null
}
