import Layout from '../components/layout-home';
import CustomHead from '../components/CustomHead';
import Hero from '../components/home/Hero';
import Triple from '../components/home/Triple';
const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../lib/notion';

export async function getStaticProps({ locale }) {
    //const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.home.english.notionPageId;
    const pageIdTr = process.env.home.turkish.notionPageId;

    const pageId =
        locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const response = await getBlocks(pageId);

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
            {/* {console.log('ALL: ', props.results)} */}
            <CustomHead pageName={process.env.home} locale={props.locale} />
            <Hero
                motto={props.results.results[0].paragraph.text[0].text.content}
            />
            <Triple
                sanghatitle={
                    props.results.results[1].heading_2.text[0].text.content
                }
                qigongtitle={
                    props.results.results[3].heading_2.text[0].text.content
                }
                tqhtitle={
                    props.results.results[5].heading_2.text[0].text.content
                }
                sanghatext={
                    props.results.results[2].paragraph.text[0].text.content
                }
                qigongtext={
                    props.results.results[4].paragraph.text[0].text.content
                }
                tqhtext={
                    props.results.results[6].paragraph.text[0].text.content
                }
            />
        </Layout>
    );
}
