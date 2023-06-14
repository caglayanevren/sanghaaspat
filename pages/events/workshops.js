const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../../lib/notion';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Band from '../../components/Band';
import CustomHead from '../../components/CustomHead';
import Image from 'next/image';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon, UnorderedList, ListItem } from '@chakra-ui/react';
import { imagecontainer, firstSectionContainer, workshopImageStyle } from '../../styles/Events.module.scss';
import firstImage from '../../public/images/events/events.jpg';
import balanceImage from '../../public/images/events/IMG_1382.jpg';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import en from '../../locales/en';
import tr from '../../locales/tr';

export async function getStaticProps({ locale }) {
    const balancePageIdEn = process.env.events.english.balance.notionPageId;
    const balancePageIdTr = process.env.events.turkish.balance.notionPageId;
    const balancePageId = locale === 'en' ? balancePageIdEn : locale === 'tr' ? balancePageIdTr : 'lang error';
    const balancePageresponse = await getPage(balancePageId);
    const balanceBlockresponse = await getBlocks(balancePageId);
    const balanceSectionContents = {};
    const balanceSectionContentLength = balanceBlockresponse.results.length;

    for (let i = 0; i < balanceSectionContentLength; i++) {
        if (balanceBlockresponse.results[i].paragraph) {
            balanceSectionContents[`${i}`] = {
                p: balanceBlockresponse.results[i].paragraph.rich_text[0].text.content,
                bold: balanceBlockresponse.results[i].paragraph.rich_text[0].annotations.bold,
            };
        } else if (balanceBlockresponse.results[i].heading_2) {
            balanceSectionContents[`${i}`] = { h2: balanceBlockresponse.results[i].heading_2.rich_text[0].text.content };
        } else if (balanceBlockresponse.results[i].heading_3) {
            balanceSectionContents[`${i}`] = { h3: balanceBlockresponse.results[i].heading_3.rich_text[0].text.content };
        } else if (balanceBlockresponse.results[i].bulleted_list_item) {
            balanceSectionContents[`${i}`] = { li: balanceBlockresponse.results[i].bulleted_list_item.rich_text[0].text.content };
        }
    }

    return {
        props: {
            balanceResults: balancePageresponse,
            balanceBlockResponse: balanceBlockresponse,
            balanceContents: balanceSectionContents,
            locale,
            balancePageId,
            balanceSectionContentLength,
        },
        revalidate: 30,
    };
}

export default function Workshops(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    return (
        <Layout>
            {console.log('ALLbalanceResults: ', props.balanceResults)}
            {console.log('ALLbalanceBlockResponse: ', props.balanceBlockResponse)}
            {console.log('ALLbalanceContents: ', props.balanceContents)}
            <CustomHead pageName={process.env.events} locale={locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="events">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={t.events.title} layout="responsive" width={1280} height={461} priority={true} />
                    </Container>
                    <Box textAlign="center">
                        <Heading as="h2" size="2xl" fontWeight="300">
                            {/* {props.balanceResults.properties.title.title[0].text.content} */}
                            {t.events.workshops}
                        </Heading>
                    </Box>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', lg: '2' }} spacing={10}>
                            <VStack h="100%" spacing={2} direction="column" alignItems="flex-start" justifyContent="space-between">
                                <Box>
                                    {/* <Heading as="h4" size="lg" marginTop={4} marginBottom={2} fontWeight="300">
                                        {props.balanceResults.properties.title.title[0].text.content}
                                    </Heading> */}
                                    {Object.keys(props.balanceContents).map((content, i) => {
                                        if (props.balanceContents[content].h3) {
                                            return (
                                                <Heading fontWeight={500} as="h3" size="lg" key={i} marginBottom={2}>
                                                    {props.balanceContents[content].h3}
                                                </Heading>
                                            );
                                        } else if (props.balanceContents[content].h2) {
                                            return (
                                                <Heading fontWeight={600} as="h2" size="xl" key={i} marginBottom={2}>
                                                    {props.balanceContents[content].h2}
                                                </Heading>
                                            );
                                        } else if (props.balanceContents[content].li) {
                                            return (
                                                <UnorderedList key={i}>
                                                    <ListItem marginBottom={0}>{props.balanceContents[content].li}</ListItem>
                                                </UnorderedList>
                                            );
                                        } else {
                                            if (props.balanceContents[content].bold) {
                                                return (
                                                    <Text key={i} marginBottom={2} fontWeight={600}>
                                                        {props.balanceContents[content].p}
                                                    </Text>
                                                );
                                            } else {
                                                return (
                                                    <Text key={i} marginBottom={2}>
                                                        {props.balanceContents[content].p}
                                                    </Text>
                                                );
                                            }
                                        }
                                    })}
                                </Box>
                            </VStack>
                            <Box>
                                <Image className={workshopImageStyle} src={balanceImage} alt={props.balanceResults.properties.title.title[0].text.content} />
                                {/* <SkeletonCircle borderRadius={0} startColor="gray.500" endColor="gray.400" size="10" /> */}
                                {/* <SkeletonText startColor="gray.500" endColor="gray.400" mt="4" noOfLines={6} spacing="4" /> */}
                            </Box>
                        </SimpleGrid>
                    </Container>
                </VStack>
            </Flex>
        </Layout>
    );
}
