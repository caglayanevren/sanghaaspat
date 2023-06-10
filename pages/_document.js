import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html translate="no">
                <Head>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                        `,
                        }}
                    />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link rel="preconnect" href="https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2" as="font" type="font/woff2" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;900&amp;display=optional" rel="stylesheet" />
                    <meta name="google" content="notranslate" />
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
