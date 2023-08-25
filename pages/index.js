import Layout from '../components/layout-home';
import CustomHead from '../components/CustomHead';
import Hero from '../components/home/Hero';
import Triple from '../components/home/Triple';
import Subscribe from '../components/home/Subscribe';
import Program from '../components/timetable/program';
const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../lib/notion';
import { getAllProgramFromNotion } from '../services/program';

import { getRecordMap } from '../libs/notion';
import { getPageTitle } from 'notion-utils'

export async function getStaticProps({ locale }) {
    //const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.home.english.notionPageId;
    const pageIdTr = process.env.home.turkish.notionPageId;
    const pageId = locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';
    const response = await getBlocks(pageId);
    
    const dbid = locale === 'en' ? process.env.SANGHAASPAT_EN_PROGRAM_DATABASE_ID : locale === 'tr' ? process.env.SANGHAASPAT_TR_PROGRAM_DATABASE_ID : 'lang error';

    const allPrograms = await getAllProgramFromNotion(locale);
    const recordMap = await getRecordMap(dbid);
    const collectionTitle = getPageTitle(recordMap); 

    return {
        props: {
            results: response,
            locale,
            pageId,
            allPrograms: allPrograms.sort((a,b)=> {
                return a.sort - b.sort
            }),
            collectionTitle,
        },
        revalidate: 30,
    };
}

export default function Home(props) {
    return (
        <Layout>
            {/* {console.log('allPrograms: ', props.allPrograms)} */}
            <CustomHead pageName={process.env.home} locale={props.locale} />
            <Hero motto={props.results.results[0].paragraph.rich_text[0].text.content} />
            <Triple
                sanghatitle={props.results.results[1].heading_2.rich_text[0].text.content}
                qigongtitle={props.results.results[3].heading_2.rich_text[0].text.content}
                tqhtitle={props.results.results[5].heading_2.rich_text[0].text.content}
                sanghatext={props.results.results[2].paragraph.rich_text[0].text.content}
                qigongtext={props.results.results[4].paragraph.rich_text[0].text.content}
                tqhtext={props.results.results[6].paragraph.rich_text[0].text.content}
            />
            <Program allPrograms={props.allPrograms} title={props.collectionTitle} locale={props.locale} />
            <Subscribe />
        </Layout>
    );
}
