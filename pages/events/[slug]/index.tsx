import Layout from '@/components/layout';
import Band from '@/components/Band';
import CustomHead from '@/components/CustomHead';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon } from '@chakra-ui/react';
//import { useRouter } from 'next/router';
import Image from 'next/image';
//import Link from 'next/link';
import { notFound } from 'next/navigation';
import NotionPage from '@/components/notion-page';
import { getRecordMap } from '@/libs/notion';
import { getAllPostsFromNotion } from '@/services/events';
import { Post } from '@/types/post';
import { ExtendedRecordMap } from 'notion-types';

export async function getStaticPaths() {
    const allPosts = await getAllPostsFromNotion();

    const paths = allPosts.map((post) => ({
        params: {
            slug: post.slug
        },
    }))

    // { fallback: false } means other routes should 404.
    //console.log("PATHS:", paths);
    return { paths, fallback: false }
}

export async function getStaticProps({ params, locale }:{ params: { slug: string }, locale: string }) {
    //console.log("2PARAMSLANG: ", params.lang);
    //console.log("2PARAMSSLUG:", params.slug);
    let recordMap;
    const allPosts = await getAllPostsFromNotion();
    // console.log("ALLPOSTS:", allPosts);
    const post = allPosts.find((p) => { 
        return p.slug === params.slug
    });
    //console.log("POST:", post);
    //console.log("LOCALE:", locale);
    if(post) {
        recordMap = await getRecordMap(post.id);
    }
    return { 
        props: { 
            post,
            recordMap,
            locale
        },
        revalidate: 30, 
    }
}

export default function PostPage( props : { post: Post, recordMap: ExtendedRecordMap, locale: string }) {
    
    //const router = useRouter();
    //const { locale } = router;


    /* if (!props.post) {
        return notFound();
    } */

    /* if (!props.post.published) {
        return (
            <article data-revalidated-at={new Date().getTime()} className="mx-auto mt-40 text-center" suppressHydrationWarning>
                <h2 className="mb-4 text-3xl font-bold">Post Not Found</h2>
                <Link href="/events">
                    <span className="mr-2">&larr;</span>
                    <span>Go to list page</span>
                </Link>
            </article>
        );
    } */
    

    return (
        <Layout>
            {/* {console.log("AAAAAAAAA: ",props.post)} */}
            {/* {console.log("BBBBBBBBB: ",props.recordMap)} */}
            <CustomHead pageName={process.env.events} locale={props.locale} />
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