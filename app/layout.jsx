import '@/styles/tailwind.css'
import '@/styles/theme.css'
import 'focus-visible'
import company_data from '../public/static/json/globals.json'

export default function RootLayout(props) {
    const { children } = props
    const { company_id } = company_data

    return (
        <html
            className="h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
            lang="en"
        >
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <link rel="shortcut icon" href="/icons/favicon.ico" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Oxygen:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
                />
                <script type="text/javascript" src="/static/test.js"></script>
                <meta name="format-detection" content="telephone=no"></meta>

                <script
                    src="https://kit.fontawesome.com/f5be3aaaed.js"
                    crossOrigin="anonymous"
                ></script>

                {/* NiceJob SDK */}
                <script
                    type="text/javascript"
                    defer
                    src={`https://cdn.nicejob.co/js/sdk.min.js?id=${company_id}`}
                />

                {/* ==== BEGIN CUSTOM HEAD TAGS ==== */}

                {/* ===== END CUSTOM HEAD TAGS ===== */}
            </head>

            <body
                x-data="{'openDialogId': ''}"
                className="font-body relative bg-[#FFFFFF] text-[#41454c] antialiased dark:bg-[#0e0e0e] dark:text-[#b3c3d9]"
            >
                {children}

                <footer>
                    {/* ==== BEGIN CUSTOM FOOTER TAGS ==== */}

                    {/* ===== END CUSTOM FOOTER TAGS ===== */}
                </footer>
            </body>
        </html>
    )
}
