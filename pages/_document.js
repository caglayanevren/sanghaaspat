import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-all-300-normal.59104fc9.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-all-400-normal.beb67d10.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-all-600-normal.3153ae14.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-all-900-normal.96761567.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-latin-300-normal.8c5f9d02.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-latin-400-normal.7275827e.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-latin-600-normal.1f652937.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/_next/static/media/raleway-latin-900-normal.cc903836.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;900&amp;display=optional"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
