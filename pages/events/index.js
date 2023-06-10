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
import workshopsImage from '../../public/images/events/events.jpg';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import en from '../../locales/en';
import tr from '../../locales/tr';

export async function getStaticProps({ locale }) {
    const workshopsPageIdEn = process.env.events.english.workshops.notionPageId;
    const workshopsPageIdTr = process.env.events.turkish.workshops.notionPageId;
    const workshopsPageId = locale === 'en' ? workshopsPageIdEn : locale === 'tr' ? workshopsPageIdTr : 'lang error';
    const workshopsPageresponse = await getPage(workshopsPageId);
    const workshopsBlockresponse = await getBlocks(workshopsPageId);
    const workshopsSectionContents = [];
    const workshopsSectionContentLength = workshopsBlockresponse.results.length;
    for (let i = 0; i < workshopsSectionContentLength; i++) {
        workshopsSectionContents.push(workshopsBlockresponse.results[i].paragraph.rich_text[0].text.content);
    }

    return {
        props: {
            workshopsResults: workshopsPageresponse,
            workshopsContents: workshopsSectionContents,
            locale,
            workshopsPageId,
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
            {console.log('ALLworkshopsResults: ', props.workshopsResults)}
            <CustomHead pageName={process.env.events} locale={locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="events">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={t.events.title} layout="responsive" width={1280} height={461} priority={true} />
                    </Container>
                    <Box textAlign="center">
                        <Heading as="h2" size="2xl" fontWeight="300">
                            {t.events.title}
                        </Heading>
                    </Box>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', md: '3' }} spacing={10}>
                            <Box boxSize="sm">
                                <Image src={workshopsImage} alt={props.workshopsResults.properties.title.title[0].text.content} />
                                <Heading as="h4" size="lg" marginTop={4} marginBottom={2} fontWeight="300">
                                    {props.workshopsResults.properties.title.title[0].text.content}
                                </Heading>
                                {props.workshopsContents.map((content, i) => (
                                    <Text key={i} marginBottom={2}>
                                        {content}
                                    </Text>
                                ))}
                                <Link
                                    href={locale === 'en' ? process.env.events.english.workshops.path : `/tr${process.env.events.turkish.workshops.path}`}
                                    aria-label={locale === 'en' ? process.env.events.english.workshops.title : `/tr${process.env.events.turkish.workshops.title}`}
                                >
                                    <Icon marginBottom={4} boxSize={'1.5rem'} as={HiOutlineArrowNarrowRight} />
                                </Link>
                            </Box>
                            <Box>
                                <SkeletonCircle borderRadius={0} startColor="gray.500" endColor="gray.400" size="10" />
                                <SkeletonText startColor="gray.500" endColor="gray.400" mt="4" noOfLines={6} spacing="4" />
                            </Box>
                            <Box>
                                <SkeletonCircle borderRadius={0} startColor="gray.500" endColor="gray.400" size="10" />
                                <SkeletonText startColor="gray.500" endColor="gray.400" mt="4" noOfLines={6} spacing="4" />
                            </Box>
                        </SimpleGrid>
                    </Container>
                    <Box textAlign="center">
                        <Text mt={5} fontWeight="300">
                            {t.events.text}
                        </Text>
                    </Box>
                </VStack>
            </Flex>
        </Layout>
    );
}
