import Layout from '../../components/layout';
import Band from '../../components/Band';
import CustomHead from '../../components/CustomHead';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon } from '@chakra-ui/react';
import { imagecontainer, firstSectionContainer } from '../../styles/Events.module.scss';
//import { useRouter } from 'next/router';
//import en from '../../locales/en';
//import tr from '../../locales/tr';
import PostsGrid from '../../components/posts/posts-grid';
import { getAllPostsFromNotion } from '../../services/events';

export async function getStaticProps({ locale }) {
    const allPosts = await getAllPostsFromNotion();
    const posts = allPosts.filter((p) => p.language === locale);
    //console.log("ALLPOSTS: ", allPosts)
    //console.log("LOCALE: ", locale)
    //console.log("POSTS: ", posts)
    return {
        props: {
            locale,
            posts
        },
        revalidate: 30,
    };

}

export default function Events(props) {
    //const router = useRouter();
    //const { locale } = router;
    //const t = locale === 'en' ? en : tr;
    return (
        <Layout>
            <CustomHead pageName={process.env.events} locale={props.locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} paddingTop={8} id="events">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl">
                        <PostsGrid allPosts={props.posts} />
                    </Container>
                </VStack>
            </Flex>
        </Layout>
    )
}