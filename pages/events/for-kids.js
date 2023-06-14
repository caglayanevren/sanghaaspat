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
    const kidsPageIdEn = process.env.events.english.kids.notionPageId;
    const kidsPageIdTr = process.env.events.turkish.kids.notionPageId;
    const kidsPageId = locale === 'en' ? kidsPageIdEn : locale === 'tr' ? kidsPageIdTr : 'lang error';
    const kidsPageresponse = await getPage(kidsPageId);
    const kidsBlockresponse = await getBlocks(kidsPageId);
    const kidsSectionContents = [];
    const kidsSectionContentLength = kidsBlockresponse.results.length;
    for (let i = 0; i < kidsSectionContentLength; i++) {
        kidsSectionContents.push(kidsBlockresponse.results[i].paragraph.rich_text[0].text.content);
    }

    return {
        props: {
            kidsResults: kidsPageresponse,
            kidsContents: kidsSectionContents,
            locale,
            kidsPageId,
        },
        revalidate: 30,
    };
}

export default function ForKids(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    return (
        <Layout>
            {/* {console.log('ALLworkshopsResults: ', props.workshopsResults)} */}
            <CustomHead pageName={process.env.events} locale={locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="events">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={t.events.title} layout="responsive" width={1280} height={461} priority={true} />
                    </Container>
                    <Box textAlign="center">
                        <Heading as="h2" size="2xl" fontWeight="300">
                            {props.kidsResults.properties.title.title[0].text.content}
                        </Heading>
                    </Box>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', md: '3' }} spacing={10}>
                            <Box>
                                <SkeletonCircle borderRadius={0} startColor="gray.500" endColor="gray.400" size="10" />
                                <SkeletonText startColor="gray.500" endColor="gray.400" mt="4" noOfLines={6} spacing="4" />
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
                </VStack>
            </Flex>
        </Layout>
    );
}
