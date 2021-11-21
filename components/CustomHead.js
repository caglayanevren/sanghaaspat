import Head from 'next/head';

export default function CustomHead({ pageName, locale, ...props }) {
    return (
        <Head>
            <title>
                {locale === 'en'
                    ? `${process.env.siteTitle} | ${pageName.en.title}`
                    : `${process.env.siteTitle} | ${pageName.tr.title}`}
            </title>
            <meta
                name="description"
                content={
                    locale === 'en'
                        ? `${pageName.en.desc}`
                        : `${pageName.tr.desc}`
                }
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
