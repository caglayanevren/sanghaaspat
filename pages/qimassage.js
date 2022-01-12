import Head from 'next/head';
const { Client } = require('@notionhq/client');
import Layout from '../components/layout';
import Band from '../components/Band';
import CustomHead from '../components/CustomHead';

/* export async function getStaticProps({ locale }) {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = '77c9eaae32e24958aaf3650265dac47a';
    const pageIdTr = '2a209e6b6d5d4400954c5e8512ba8b56';

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
} */

export default function QiMassage(props) {
    return (
        <Layout>
            <CustomHead
                pageName={process.env.qimassage}
                locale={props.locale}
            />
            <Band />
            <p>Qi Massage/Qi Masaj</p>
        </Layout>
    );
}
