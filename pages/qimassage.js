const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../lib/notion';
import Layout from '../components/layout';
import Band from '../components/Band';
import CustomHead from '../components/CustomHead';
import FirstSection from '../components/qimassage/FirstSection';
import { Container, position } from '@chakra-ui/react';
import ImageSlider from '../components/ImageSlider2';

import { getAllImagesFromQiMassageSlider } from '@/services/getQiMassageSliderImages';

export async function getStaticProps({ locale }) {
    const allPosts = await getAllImagesFromQiMassageSlider();

    const pageIdEn = process.env.qimassage.english.notionPageId;
    const pageIdTr = process.env.qimassage.turkish.notionPageId;

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
            allPosts,
        },
        revalidate: 30,
    };
}

export default function QiMassage(props) {
    const slider_images = props.allPosts;
    return (
        <Layout>
            <CustomHead pageName={process.env.qimassage} locale={props.locale} />
            <Band />
            <FirstSection title={props.results.properties.Title.title[0].text.content} contents={props.contents} />
            <Container maxW="container.lg">
                <ImageSlider images={slider_images} />
            </Container>
        </Layout>
    );
}
