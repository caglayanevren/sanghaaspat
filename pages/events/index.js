const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../../lib/notion';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Band from '../../components/Band';
import CustomHead from '../../components/CustomHead';
import Image from 'next/image';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon } from '@chakra-ui/react';
import { imagecontainer, firstSectionContainer } from '../../styles/Events.module.scss';
import firstImage from '../../public/images/events/events.jpg';
import workshopsImage from '../../public/images/events/IMG_0223.jpg';
import kidsImage from '../../public/images/events/IMG_6917.jpg';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import en from '../../locales/en';
import tr from '../../locales/tr';

export async function getStaticProps({ locale }) {
    const workshopsPageIdEn = process.env.events.english.workshops.notionPageId;
    const workshopsPageIdTr = process.env.events.turkish.workshops.notionPageId;
    const kidsPageIdEn = process.env.events.english.kids.notionPageId;
    const kidsPageIdTr = process.env.events.turkish.kids.notionPageId;
    const workshopsPageId = locale === 'en' ? workshopsPageIdEn : locale === 'tr' ? workshopsPageIdTr : 'lang error';
    const kidsPageId = locale === 'en' ? kidsPageIdEn : locale === 'tr' ? kidsPageIdTr : 'lang error';
    const workshopsPageresponse = await getPage(workshopsPageId);
    const workshopsBlockresponse = await getBlocks(workshopsPageId);
    const kidsPageresponse = await getPage(kidsPageId);
    const kidsBlockresponse = await getBlocks(kidsPageId);
    const workshopsSectionContents = [];
    const kidsSectionContents = [];
    const workshopsSectionContentLength = workshopsBlockresponse.results.length;
    const kidsSectionContentLength = workshopsBlockresponse.results.length;
    for (let i = 0; i < workshopsSectionContentLength; i++) {
        workshopsSectionContents.push(workshopsBlockresponse.results[i].paragraph.rich_text[0].text.content);
    }
    for (let i = 0; i < kidsSectionContentLength; i++) {
        kidsSectionContents.push(kidsBlockresponse.results[i].paragraph.rich_text[0].text.content);
    }

    return {
        props: {
            workshopsResults: workshopsPageresponse,
            workshopsContents: workshopsSectionContents,
            kidsResults: kidsPageresponse,
            kidsContents: kidsSectionContents,
            locale,
            workshopsPageId,
            kidsPageId,
        },
        revalidate: 30,
    };
}

export default function Events(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    return (
        <Layout>
            {/* {console.log('ALLworkshopsResults: ', props.workshopsContents)} */}
            <CustomHead pageName={process.env.events} locale={locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="events">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={t.events.title} width={1280} height={461} priority={true} />
                    </Container>
                    <Box textAlign="center">
                        <Heading as="h2" fontWeight="400">
                            {t.events.title}
                        </Heading>
                    </Box>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', md: '2', lg: '3' }} spacing={10}>
                            <VStack h="100%" spacing={2} direction="column" alignItems="flex-start" justifyContent="space-between">
                                <Box>
                                    <Image src={workshopsImage} alt={props.workshopsResults.properties.title.title[0].text.content} rounded={8} />
                                    <Heading as="h4" size="lg" marginTop={4} marginBottom={2} fontWeight="400">
                                        {props.workshopsResults.properties.title.title[0].text.content}
                                    </Heading>
                                    {props.workshopsContents.map((content, i) => (
                                        <Text key={i} marginBottom={2}>
                                            {content}
                                        </Text>
                                    ))}
                                </Box>
                                <Link
                                    href={locale === 'en' ? process.env.events.english.workshops.path : `/tr${process.env.events.turkish.workshops.path}`}
                                    aria-label={locale === 'en' ? process.env.events.english.workshops.title : `/tr${process.env.events.turkish.workshops.title}`}
                                >
                                    <Icon marginBottom={4} boxSize={'1.5rem'} as={HiOutlineArrowNarrowRight} />
                                </Link>
                            </VStack>
                            <VStack h="100%" spacing={2} direction="column" alignItems="flex-start" justifyContent="space-between">
                                <Box>
                                    <Image src={kidsImage} alt={props.kidsResults.properties.title.title[0].text.content} rounded={8} />
                                    <Heading as="h4" size="lg" marginTop={4} marginBottom={2} fontWeight="400">
                                        {props.kidsResults.properties.title.title[0].text.content}
                                    </Heading>
                                    {props.kidsContents.map((content, i) => (
                                        <Text key={i} marginBottom={2}>
                                            {content}
                                        </Text>
                                    ))}
                                </Box>
                                <Link
                                    href={locale === 'en' ? process.env.events.english.kids.path : `/tr${process.env.events.turkish.kids.path}`}
                                    aria-label={locale === 'en' ? process.env.events.english.kids.title : `/tr${process.env.events.turkish.kids.title}`}
                                >
                                    <Icon marginBottom={4} boxSize={'1.5rem'} as={HiOutlineArrowNarrowRight} />
                                </Link>
                            </VStack>
                            <Box>
                                <SkeletonCircle borderRadius={0} startColor="gray.500" endColor="gray.400" size="10" />
                                <SkeletonText startColor="gray.500" endColor="gray.400" mt="4" noOfLines={6} spacing="4" />
                            </Box>
                            <Box display={{ base: 'none', md: 'block', lg: 'none' }}>
                                <SkeletonCircle borderRadius={0} startColor="gray.500" endColor="gray.400" size="10" />
                                <SkeletonText startColor="gray.500" endColor="gray.400" mt="4" noOfLines={6} spacing="4" />
                            </Box>
                        </SimpleGrid>
                    </Container>
                    <Box textAlign="center">
                        <Text mt={5} fontWeight="400">
                            {t.events.text}
                        </Text>
                    </Box>
                </VStack>
            </Flex>
        </Layout>
    );
}
