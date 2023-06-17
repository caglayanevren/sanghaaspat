const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../lib/notion';
import Layout from '../components/layout';
import CustomHead from '../components/CustomHead';
import Band from '../components/Band';
import RetreatForm from '../components/retreat/retreat-form';
import FirstSection from '../components/retreat/FirstSection';
import { Link, Flex, VStack, Box, Heading, Text, Container, Button } from '@chakra-ui/react';

export async function getStaticProps({ locale }) {
    //const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.retreats.english.notionPageId;
    const pageIdTr = process.env.retreats.turkish.notionPageId;

    const pageId = locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const pageresponse = await getPage(pageId);
    const blockresponse = await getBlocks(pageId);

    const sectionContents = [];
    const sectionContentLength = blockresponse.results.length;

    for (let i = 0; i < sectionContentLength; i++) {
        sectionContents.push(blockresponse.results[i].paragraph.rich_text[0].text.content);
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
            {/* {console.log('Results: ', props.results)} */}
            {/* {console.log('Contents: ', props.contents)} */}
            <CustomHead pageName={process.env.retreats} locale={props.locale} />
            <Band />
            <FirstSection title={props.results.properties.Title.title[0].text.content} contents={props.contents} />
            <Container maxW="container.xl">
                <RetreatForm />
            </Container>
        </Layout>
    );
}
