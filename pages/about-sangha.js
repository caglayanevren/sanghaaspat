const { Client } = require('@notionhq/client');
import Layout from '../components/layout';
import CustomHead from '../components/CustomHead';
import Band from '../components/Band';
import FirstSection from '../components/sanghaaspat/FirstSection';

export async function getStaticProps({ locale }) {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.aboutSangha.en.notionPageId;
    const pageIdTr = process.env.aboutSangha.tr.notionPageId;

    const pageId =
        locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const pageresponse = await notion.pages.retrieve({
        page_id: pageId,
    });

    const childresponse = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
    });

    const sectionContents = [];
    const sectionContentLength = childresponse.results.length;

    for (let i = 0; i < sectionContentLength; i++) {
        sectionContents.push(
            childresponse.results[i].paragraph.text[0].text.content
        );
    }

    return {
        props: {
            results: pageresponse,
            contents: sectionContents,
            locale,
            pageId,
        },
        revalidate: 30,
    };
}

export default function About(props) {
    return (
        <Layout>
            {/* {console.log('ALLpageresults: ', props.results)} */}
            {/* {console.log('ALLcontents: ', props.contents)} */}
            <CustomHead
                pageName={process.env.aboutSangha}
                locale={props.locale}
            />
            <Band />
            <FirstSection
                title={props.results.properties.Title.title[0].text.content}
                contents={props.contents}
            />
        </Layout>
    );
}
