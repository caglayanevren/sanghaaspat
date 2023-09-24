import Layout from '@/components/layout';
import Band from '@/components/Band';
import CustomHead from '@/components/CustomHead';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import NotionPage from '@/components/notion-page';
import { getRecordMap } from '@/libs/notion';
import { getAllPostsFromNotion } from '@/services/events';
import { Post } from '@/types/post';
import { ExtendedRecordMap } from 'notion-types';
import en from '@/locales/en';
import tr from '@/locales/tr';
import { useRouter } from 'next/router';

export async function getStaticPaths({ locales }: { locales: string[] }) {
    const allPosts = await getAllPostsFromNotion();
    //console.log("allPosts::",allPosts)
    let paths: { params: { slug: string; }; locale: string; }[] = [];

    allPosts.forEach((post) => {
        for (const locale of locales) {
            if (post.language === locale) {
                paths.push({
                    params: {
                        slug: String(post.slug)
                    },
                    locale
                });
            }
        }
    })

    return { paths, fallback: false }
}

export async function getStaticProps({ params, locale }: { params: { slug: string }, locale: string }) {
    let recordMap;
    const allPosts = await getAllPostsFromNotion();
    const post = allPosts.find((p) => {
        return String(p.slug) === String(params.slug) && String(p.language) === String(locale)
    });
    if (post) {
        recordMap = await getRecordMap(post.id);
    }
    return {
        props: {
            post,
            recordMap,
            lang: locale,
            locale
        },
        revalidate: 30,
    }
}

export default function PostPage(props: { post: Post, recordMap: ExtendedRecordMap, lang: string }) {

    if (!props.post) { return notFound() }

    if (!props.post.published) {
        return (
            <article data-revalidated-at={new Date().getTime()} className="mx-auto mt-40 text-center" suppressHydrationWarning>
                <h2 className="mb-4 text-3xl font-bold">{t.events.eventnotfound}</h2>
                <Link href="/events">
                    <span className="mr-2">&larr;</span>
                    <span>{t.events.gotoeventspage}</span>
                </Link>
            </article>
        );
    }

    return (
        <Layout>
            <CustomHead pageName={process.env.events} locale={props.lang} />
            <Band />
            <Flex w={'full'} paddingBottom={12} id="events">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl">
                        <article data-revalidated-at={new Date().getTime()} className="mt-4 flex flex-col items-center md:mt-6" suppressHydrationWarning>
                            <div className="relative aspect-[3/2] w-[90vw] max-w-[900px]">
                                <Image src={props.post.cover} alt="cover" fill style={{ objectFit: 'cover' }} priority />
                            </div>
                            <NotionPage post={props.post} recordMap={props.recordMap} />
                        </article>
                    </Container>
                </VStack>
            </Flex>
        </Layout>
    );
}