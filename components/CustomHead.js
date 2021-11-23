import Head from 'next/head';

export default function CustomHead({ pageName, locale, ...props }) {
    return (
        <Head>
            <title>
                {locale === 'en'
                    ? `${process.env.siteTitle} | ${pageName.english.title}`
                    : `${process.env.siteTitle} | ${pageName.turkish.title}`}
            </title>
            <meta
                name="description"
                content={
                    locale === 'en'
                        ? `${pageName.english.desc}`
                        : `${pageName.turkish.desc}`
                }
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
