const { Client } = require('@notionhq/client');
import { databaseId, getDatabase, getPage, getBlocks } from '../../lib/notion';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Image from 'next/image';
import Layout from '../../components/layout';
import Band from '../../components/Band';
import CustomHead from '../../components/CustomHead';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon, AspectRatio } from '@chakra-ui/react';
import { imagecontainer, firstSectionContainer, videoIframe } from '../../styles/Events.module.scss';
import firstImage from '../../public/images/events/events.jpg';
//import workshopsImage from '../../public/images/events/events.jpg';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
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
            {/* {console.log('ALLkidsResults: ', props.kidsResults)} */}
            {/* {console.log('ALLkidsContents: ', props.kidsContents)} */}
            <Script type="text/javascript" id="hs-script-loader" strategy="lazyOnload" async defer src="//player.vimeo.com/api/player.js" />
            <CustomHead pageName={process.env.events} locale={locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="events">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={t.events.title} width={1280} height={461} priority={true} />
                    </Container>
                    <Flex w={'full'} maxW="container.xl" paddingInline={'1rem'}>
                        <Box textAlign="center" display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Link href={locale === 'en' ? '/events/workshops' : '/tr/etkinlikler/workshoplar'} title={locale === 'en' ? 'Workshops' : 'Workshoplar'} display={'inline-flex'}>
                                <Icon marginBottom={0} boxSize={'1.5rem'} as={HiOutlineArrowNarrowLeft} />
                            </Link>
                        </Box>
                        <Spacer />
                        <Heading as="h2" fontWeight="400">
                            {props.kidsResults.properties.title.title[0].text.content}
                        </Heading>
                        <Spacer />
                        <Box textAlign="center">&nbsp;</Box>
                    </Flex>

                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: '1', lg: '2' }} spacing={10}>
                            <Box>
                                <AspectRatio ratio={16 / 9}>
                                    <iframe
                                        src="https://player.vimeo.com/video/836846233?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        className={videoIframe}
                                        title="Qi Gong for Kids"
                                    ></iframe>
                                </AspectRatio>
                            </Box>
                            <Box>
                                {props.kidsContents.map((content, i) => (
                                    <Text key={i} marginBottom={2}>
                                        {content}
                                    </Text>
                                ))}
                            </Box>
                        </SimpleGrid>
                    </Container>
                </VStack>
            </Flex>
        </Layout>
    );
}
