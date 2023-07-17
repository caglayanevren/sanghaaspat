import PostsGrid from '@/components/posts/posts-grid';
import { getAllPostsFromNotion } from '@/services/posts';

export const metadata = {
    title: 'Blog',
    description: 'All posts are created by notion ai',
};

export default async function BlogPage() {
    const allPosts = await getAllPostsFromNotion();

    return (
        <>
            <PostsGrid allPosts={allPosts} />
        </>
    );
}
