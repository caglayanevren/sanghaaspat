import Head from 'next/head';
import Layout from '../components/layout-home';
import Hero from '../components/home/Hero';
import FirstSection from '../components/home/FirstSection';
const { Client } = require('@notionhq/client');

export async function getStaticProps({ locale }) {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = '366afccc9ec74e3cae9f89af70b33459';
    const pageIdTr = 'b3a0c0fede8d457499a7da71a0e010db';

    const pageId =
        locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
    });

    const firstSectionContents = [];
    const firstSectionContentLength = response.results.length;

    for (let i = 2; i < firstSectionContentLength; i++) {
        firstSectionContents.push(
            response.results[i].paragraph.text[0].text.content
        );
    }

    return {
        props: {
            results: response,
            firstSectionContents,
            firstSectionContentLength,
            locale,
            pageId,
        },
        revalidate: 30,
    };
}

export default function Home(props) {
    return (
        <Layout>
            {console.log('ALL: ', props.results)}
            <Head>
                <title>
                    {props.locale === 'en'
                        ? 'Sangha Aspat | Home'
                        : 'Sangha Aspat | Anasayfa'}
                </title>
                <meta
                    name="description"
                    content={props.locale === 'en' ? 'en desc' : 'tr desc'}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Hero
                motto={props.results.results[0].paragraph.text[0].text.content}
            />
            <FirstSection
                title={props.results.results[1].heading_2.text[0].text.content}
                contents={props.firstSectionContents}
                contentlength={props.firstSectionContentLength}
            />
        </Layout>
    );
}
