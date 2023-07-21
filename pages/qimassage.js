const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../lib/notion';
import Layout from '../components/layout';
import Band from '../components/Band';
import CustomHead from '../components/CustomHead';
import FirstSection from '../components/qimassage/FirstSection';
//import Gallery from '../components/Gallery';
import { Container, position } from '@chakra-ui/react';
import ImageSlider from '../components/ImageSlider';
import ImageSlider2 from '../components/ImageSlider2';

import { getAllImagesFromNotion } from '@/services/images';

export async function getStaticProps({ locale }) {
    const allPosts = await getAllImagesFromNotion();
    //const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.qimassage.english.notionPageId;
    const pageIdTr = process.env.qimassage.turkish.notionPageId;
    const galleryId = process.env.qimassage.galleryId;

    const pageId = locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const pageresponse = await getPage(pageId);
    const blockresponse = await getBlocks(pageId);
    const galleryImageData = await getBlocks(galleryId);

    const galleryImages = galleryImageData.results.map((result) => {
        return {
            src: result.table_row.cells[1][0].plain_text,
            alt: result.table_row.cells[2][0].plain_text,
        };
    });

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
            galleryImages,
            allPosts,
        },
        revalidate: 30,
    };
}

export default function QiMassage(props) {
    const images = props.galleryImages;
    const slider_images = props.allPosts;
    return (
        <Layout>
            {console.log('IMAGES: ', images)}
            {console.log('SLIDERIMAGES: ', slider_images)}
            <CustomHead pageName={process.env.qimassage} locale={props.locale} />
            <Band />
            <FirstSection title={props.results.properties.Title.title[0].text.content} contents={props.contents} />
            <Container maxW="container.lg">
                <ImageSlider images={images} />
            </Container>
            {
                <Container maxW="container.lg">
                    <ImageSlider2 images={slider_images} />
                </Container>
            }
        </Layout>
    );
}
