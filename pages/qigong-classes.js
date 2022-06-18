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

export async function getStaticProps({ locale }) {
    //const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = process.env.qigongClasses.english.notionPageId;
    const pageIdTr = process.env.qigongClasses.turkish.notionPageId;

    const pageId = locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const pageresponse = await getPage(pageId);
    const blockresponse = await getBlocks(pageId);
    return {
        props: {
            pageresponse,
            blockresponse,
            locale,
            pageId,
        },
        revalidate: 30,
    };
}

export default function QiGongClasses(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    return (
        <Layout>
            <CustomHead pageName={process.env.qigongClasses} locale={props.locale} />
            <Band />
            {/* {console.log('pageresponse: ', props.pageresponse)} */}
            {/* {console.log('blockresponse: ', props.blockresponse)} */}
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="qigongclasses">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={props.pageresponse.properties.Title.title[0].plain_text} layout="responsive" width={1280} height={461} priority={true} />
                    </Container>
                    <Heading as="h2" fontWeight="400">
                        {props.pageresponse.properties.Title.title[0].plain_text}
                    </Heading>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', md: '3' }} spacing={10}>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="semibold">
                                    {props.blockresponse.results[0].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="h3" fontSize="xl">
                                    {props.blockresponse.results[1].heading_3.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[2].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[3].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="semibold">
                                    {props.blockresponse.results[4].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="h3" fontSize="xl">
                                    {props.blockresponse.results[5].heading_3.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[6].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[7].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="semibold">
                                    {props.blockresponse.results[8].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="h3" fontSize="xl">
                                    {props.blockresponse.results[9].heading_3.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[10].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[11].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[12].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </Container>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', md: '3' }} spacing={10}>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="semibold">
                                    {props.blockresponse.results[13].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="h3" fontSize="xl">
                                    {props.blockresponse.results[14].heading_3.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[15].paragraph.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" marginTop="1rem">
                                    {props.blockresponse.results[16].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="semibold">
                                    {props.blockresponse.results[17].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="h3" fontSize="xl">
                                    {props.blockresponse.results[18].heading_3.rich_text[0].plain_text}
                                </Text>
                                <Text as="p" fontStyle="italic">
                                    {props.blockresponse.results[19].paragraph.rich_text[0].plain_text}
                                </Text>
                            </Box>
                            <Box>
                                <Text as="h2" fontSize="2xl" fontWeight="semibold">
                                    {props.blockresponse.results[20].heading_2.rich_text[0].plain_text}
                                </Text>
                                <Text as="h3" fontSize="xl">
                                    {props.blockresponse.results[21].heading_3.rich_text[0].plain_text}
                                </Text>
                                <Text as="p">{props.blockresponse.results[22].paragraph.rich_text[0].plain_text}</Text>
                                <Link href={locale == 'en' ? process.env.qimassage.english.path : `/tr${process.env.qimassage.turkish.path}`} _hover={{ textDecoration: 'none' }}>
                                    <Button rightIcon={<ArrowForwardIcon />}>{t.qigongClasses.qigongmassageLinkText}</Button>
                                </Link>
                            </Box>
                        </SimpleGrid>
                    </Container>
                </VStack>
            </Flex>
        </Layout>
    );
}
