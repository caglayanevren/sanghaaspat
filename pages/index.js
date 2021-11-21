import Layout from '../components/layout-home';
import CustomHead from '../components/CustomHead';
import Hero from '../components/home/Hero';
const { Client } = require('@notionhq/client');

export async function getStaticProps({ locale }) {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.home.en.notionPageId;
    const pageIdTr = process.env.home.tr.notionPageId;

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
            {console.log('ALL: ', props.results)}
            <CustomHead pageName={process.env.home} locale={props.locale} />
            <Hero
                motto={props.results.results[0].paragraph.text[0].text.content}
            />
        </Layout>
    );
}
