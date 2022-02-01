import Head from 'next/head';

export default function CustomHead({ pageName, locale, ...props }) {
    return (
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;900&amp;display=swap" rel="stylesheet"/>
            <title>
                {locale == 'en'
                    ? `${process.env.siteTitle} | ${pageName.english.title}`
                    : `${process.env.siteTitle} | ${pageName.turkish.title}`}
            </title>
            <meta
                name="description"
                content={
                    locale == 'en'
                        ? `${pageName.english.desc}`
                        : `${pageName.turkish.desc}`
                }
            />
            <link rel="icon" href="/favicon.ico" />
            <meta
                name="og:title"
                content={
                    locale == 'en'
                        ? `${process.env.siteTitle} | ${pageName.english.title}`
                        : `${process.env.siteTitle} | ${pageName.turkish.title}`
                }
            />
            <meta
                name="og:description"
                content={
                    locale == 'en'
                        ? `${pageName.english.desc}`
                        : `${pageName.turkish.desc}`
                }
            />
            <meta name="og:image" content="/SanghaAspat.png" />
            <meta name="og:url" content="https://sanghaaspat.com/" />
            <meta name="og:site_name" content="Sangha Aspat" />
            <meta
                name="og:locale"
                content={locale == 'en' ? 'en_GB' : 'tr_TR'}
            />
            <meta name="og:type" content="website" />
        </Head>
    );
}
