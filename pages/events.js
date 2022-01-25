const { Client } = require('@notionhq/client');
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Band from '../components/Band';
import CustomHead from '../components/CustomHead';
import Image from 'next/image';
import {
    Link,
    Flex,
    VStack,
    Box,
    Spacer,
    Heading,
    Text,
    Container,
    Button,
    SimpleGrid,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from '@chakra-ui/react';
import {
    imagecontainer,
    firstSectionContainer,
} from '../styles/Events.module.scss';
import firstImage from '../public/images/events/events.jpg';
import en from '../locales/en';
import tr from '../locales/tr';

/* export async function getStaticProps({ locale }) {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const pageIdEn = '77c9eaae32e24958aaf3650265dac47a';
    const pageIdTr = '2a209e6b6d5d4400954c5e8512ba8b56';

    const pageId =
        locale === 'en' ? pageIdEn : locale === 'tr' ? pageIdTr : 'lang error';

    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
    });
    return {
        props: {
            results: response,
            locale,
            pageId,
        },
        revalidate: 30,
    };
} */

export default function Events(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    return (
        <Layout>
            <CustomHead pageName={process.env.events} locale={props.locale} />
            <Band />
            <Flex
                w={'full'}
                className={firstSectionContainer}
                paddingBottom={12}
                id="events"
            >
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image
                            className={'image'}
                            src={firstImage}
                            alt={t.events.title}
                            layout="responsive"
                            width={1280}
                            height={461}
                            priority={true}
                        />
                    </Container>
                    <Box textAlign="center">
                        <Heading as="h2" fontWeight="400">
                            {t.events.title}
                        </Heading>
                        <Text mt={5} fontWeight="300">
                            {t.events.text}
                        </Text>
                    </Box>
                    <Container maxW="container.xl">
                        <SimpleGrid
                            columns={{ base: '1', md: '3' }}
                            spacing={10}
                        >
                            <Box>
                                <SkeletonCircle
                                    borderRadius={0}
                                    startColor="gray.500"
                                    endColor="gray.400"
                                    size="10"
                                />
                                <SkeletonText
                                    startColor="gray.500"
                                    endColor="gray.400"
                                    mt="4"
                                    noOfLines={6}
                                    spacing="4"
                                />
                            </Box>
                            <Box>
                                <SkeletonCircle
                                    borderRadius={0}
                                    startColor="gray.500"
                                    endColor="gray.400"
                                    size="10"
                                />
                                <SkeletonText
                                    startColor="gray.500"
                                    endColor="gray.400"
                                    mt="4"
                                    noOfLines={6}
                                    spacing="4"
                                />
                            </Box>
                            <Box>
                                <SkeletonCircle
                                    borderRadius={0}
                                    startColor="gray.500"
                                    endColor="gray.400"
                                    size="10"
                                />
                                <SkeletonText
                                    startColor="gray.500"
                                    endColor="gray.400"
                                    mt="4"
                                    noOfLines={6}
                                    spacing="4"
                                />
                            </Box>
                        </SimpleGrid>
                    </Container>
                </VStack>
            </Flex>
        </Layout>
    );
}
