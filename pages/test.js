import Head from 'next/head';
//import Image from 'next/image';
import Layout from '../components/layout';
import styles from '../styles/Home.module.scss';
const { Client } = require('@notionhq/client');

export async function getStaticProps({ locale }) {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const menuIdEn = '6081420da2c4414594e537374c54fe4c';
    const menuIdTr = '443f135100da45018602c25da471a94d';

    const menuId =
        locale === 'en' ? menuIdEn : locale === 'tr' ? menuIdTr : 'lang error';

    //console.log(menuId);
    //const response = await notion.pages.retrieve({ page_id: menuId });
    const response = await notion.blocks.children.list({
        block_id: menuId,
        page_size: 50,
    });
    return {
        props: {
            results: response.results,
            locale,
            menuid: menuId,
        },
        revalidate: 30,
    };
}

export default function Home(props) {
    return (
        <Layout>
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
            <div className={styles.container}>
                test: {JSON.stringify(props.results[0].paragraph.text[0].text.content,null,2)}
                {/* {console.log(props.results[0])} */}
                {/* {props.results.properties.Title.title[0].text.content} */}
                {/* {props.results.map((result) => {
                    console.log(result);
                })} */}
            </div>
        </Layout>
    );
}
