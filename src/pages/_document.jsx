import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document(props) {
    let pageProps = props.__NEXT_DATA__?.props?.pageProps

    return (
        <Html
            className="h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
            lang="en"
        >
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
                />
                <script type="text/javascript" src="https://storage.googleapis.com/editor-sdk/editor.js"></script>

                <script type="text/javascript" src="/static/test.js"></script>

                <meta name="format-detection" content="telephone=no"></meta>
            </Head>
            <body x-data="{'openDialogId': ''}" className="font-body antialiased text-[#41454c] bg-[#FFFFFF] dark:text-[#b3c3d9] dark:bg-[#0e0e0e]">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
