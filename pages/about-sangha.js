const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../lib/notion';
import Layout from '../components/layout';
import CustomHead from '../components/CustomHead';
import Band from '../components/Band';
import FirstSection from '../components/about-sangha/FirstSection';
import CVLayout from '../components/about-sangha/CVLayout';
import zeynepCVImage from '../public/images/about-sangha/zeynep.jpg';
import hazalCVImage from '../public/images/about-sangha/hazal.jpg';

export async function getStaticProps({ locale }) {
    //const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.aboutSangha.english.notionPageId;
    const pageIdTr = process.env.aboutSangha.turkish.notionPageId;
    const firstCVIdEn = process.env.aboutSangha.english.firstCVId;
    const firstCVIdTr = process.env.aboutSangha.turkish.firstCVId;
    const secondCVIdEn = process.env.aboutSangha.english.secondCVId;
    const secondCVIdTr = process.env.aboutSangha.turkish.secondCVId;

    const pageId = locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';
    const firstId = locale === 'en' ? firstCVIdEn : locale === 'tr' ? firstCVIdTr : 'lang error';
    const secondId = locale === 'en' ? secondCVIdEn : locale === 'tr' ? secondCVIdTr : 'lang error';

    const pageresponse = await getPage(pageId);
    const blockresponse = await getBlocks(pageId);
    const firstpageresponse = await getPage(firstId);
    const firstblockresponse = await getBlocks(firstId);
    const secondpageresponse = await getPage(secondId);
    const secondblockresponse = await getBlocks(secondId);

    const sectionContents = [];
    const sectionContentLength = blockresponse.results.length;
    const firstCVContents = [];
    const firstCVContentLength = firstblockresponse.results.length;
    const secondCVContents = [];
    const secondCVContentLength = secondblockresponse.results.length;

    for (let i = 0; i < sectionContentLength; i++) {
        sectionContents.push(blockresponse.results[i].paragraph.rich_text[0].text.content);
    }
    for (let i = 0; i < firstCVContentLength; i++) {
        firstCVContents.push(firstblockresponse.results[i].paragraph.rich_text[0].text.content);
    }
    for (let i = 0; i < secondCVContentLength; i++) {
        secondCVContents.push(secondblockresponse.results[i].paragraph.rich_text[0].text.content);
    }

    return {
        props: {
            results: pageresponse,
            contents: sectionContents,
            firstcvresults: firstpageresponse,
            firstcvcontents: firstCVContents,
            firstCVdegree: firstpageresponse.properties.Degree.rich_text[0].text.content,
            secondcvresults: secondpageresponse,
            secondcvcontents: secondCVContents,
            secondCVdegree: secondpageresponse.properties.Degree.rich_text[0].text.content,
            locale,
            pageId,
        },
        revalidate: 30,
    };
}

export default function About(props) {
    return (
        <Layout>
            {/* {console.log('ALLpageresults: ', props.firstcvresults)} */}
            {/* {console.log('ALLcontents: ', props.firstcvcontents)} */}
            <CustomHead pageName={process.env.aboutSangha} locale={props.locale} />
            <Band />
            <FirstSection title={props.results.properties.Title.title[0].text.content} contents={props.contents} />
            <CVLayout title={props.firstcvresults.properties.Title.title[0].text.content} degree={props.firstCVdegree} contents={props.firstcvcontents} name="zeynep" CVImage={zeynepCVImage} />
            <CVLayout title={props.secondcvresults.properties.Title.title[0].text.content} degree={props.secondCVdegree} contents={props.secondcvcontents} name="hazal" CVImage={hazalCVImage} />
        </Layout>
    );
}
