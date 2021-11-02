import Head from 'next/head';
const { Client } = require('@notionhq/client');
import Layout from '../components/layout';
//import styles from '../styles/Home.module.scss';
import Hero from '../components/Hero';
//import { Box } from '@chakra-ui/react';

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
    return {
        props: {
            results: response,
            locale,
            pageId,
        },
        revalidate: 30,
    };
}

export default function Home(props) {
    return (
        <Layout>
            {/* {console.log(props.results)} */}
            <Head>
                <title>
                    {props.locale === 'en'
                        ? 'Sangha Aspat | Home'
                        : 'Sangha Aspat | Anasayfa'}
                </title>
                <meta
                    name="description"
                    content={
                        props.locale === 'en'
                            ? 'Sangha Aspat | Home'
                            : 'Sangha Aspat | Anasayfa'
                    }
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Hero
                motto={props.results.results[0].paragraph.text[0].text.content}
            />
        </Layout>
    );
}
