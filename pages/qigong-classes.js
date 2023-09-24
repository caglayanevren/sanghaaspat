const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../lib/notion';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import CustomHead from '../components/CustomHead';
import Band from '../components/Band';
import Image from 'next/image';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import firstImage from '../public/images/qigong-classes/qigong-classes.jpg';
import { imagecontainer, firstSectionContainer } from '../styles/QiGongClasses.module.scss';
import en from '../locales/en';
import tr from '../locales/tr';
import ImageSlider from '../components/ImageSlider2';

import ProgramGrid from '../components/timetable/program';
import { getAllProgramFromNotion } from '../services/program';
import { getRecordMap } from '../libs/notion';
import { getPageTitle, getTextContent } from 'notion-utils'

import { getAllImagesFromQiGongClassesSlider } from '@/services/getQiGongClassesSliderImages';

export async function getStaticProps({ locale }) {
    const allPosts = await getAllImagesFromQiGongClassesSlider();

    const pageIdEn = process.env.qigongClasses.english.notionPageId;
    const pageIdTr = process.env.qigongClasses.turkish.notionPageId;

    const pageId = locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const pageresponse = await getPage(pageId);
    const blockresponse = await getBlocks(pageId);

    const dbid = locale === 'en' ? process.env.SANGHAASPAT_EN_PROGRAM_DATABASE_ID : locale === 'tr' ? process.env.SANGHAASPAT_TR_PROGRAM_DATABASE_ID : 'lang error';

    const allPrograms = await getAllProgramFromNotion(locale);
    const recordMap = await getRecordMap(dbid);
    const collectionTitle = getPageTitle(recordMap); 

    return {
        props: {
            pageresponse,
            blockresponse,
            locale,
            pageId,
            allPosts,
            allPrograms: allPrograms.sort((a,b)=> {
                return a.sort - b.sort
            }),
            collectionTitle,
        },
        revalidate: 30,
    };
}

export default function QiGongClasses(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;
    const slider_images = props.allPosts;
    return (
        <Layout>
            <CustomHead pageName={process.env.qigongClasses} locale={props.locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="qigongclasses">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={props.pageresponse.properties.Title.title[0].plain_text} width={1280} height={461} priority={true} />
                    </Container>
                    <Heading as="h2" fontWeight="400">
                        {props.pageresponse.properties.Title.title[0].plain_text}
                    </Heading>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', md: '3' }} spacing={10}>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="500">
                                    {props.blockresponse.results[0].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[1].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[2].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="500">
                                    {props.blockresponse.results[3].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[4].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[5].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="500">
                                    {props.blockresponse.results[6].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[7].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[8].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </Container>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', md: '3' }} spacing={10}>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="500">
                                    {props.blockresponse.results[9].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[10].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[11].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="500">
                                    {props.blockresponse.results[12].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[13].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[14].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="500">
                                    {props.blockresponse.results[15].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[16].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">{props.blockresponse.results[17].paragraph.rich_text[0].plain_text}</Text>
                                <Link href={locale == 'en' ? process.env.qimassage.english.path : `/tr${process.env.qimassage.turkish.path}`} _hover={{ textDecoration: 'none' }}>
                                    <Button rightIcon={<ArrowForwardIcon />}>{t.qigongClasses.qigongmassageLinkText}</Button>
                                </Link>
                            </Box>
                        </SimpleGrid>
                    </Container>
                    <ProgramGrid allPrograms={props.allPrograms} title={props.collectionTitle} locale={props.locale} />
                    <Container maxW="container.lg">
                        <ImageSlider images={slider_images} />
                    </Container>
                </VStack>
            </Flex>
        </Layout>
    );
}
