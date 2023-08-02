import Image from 'next/image';
import Link from 'next/link';
//import CategoryList from '@/components/category-list';
import { Post } from '@/types/post';
import { useRouter } from 'next/router';

export default function PostCard({ post: { slug, title, date, cover, language } }: { post: Post }) {
    const router = useRouter();
    const { locale } = router;
    return (
        <Link href={`${locale==='en' ? 'events/' : 'tr/etkinlikler/'}${slug}`}>
            <article className="w-full mx-auto flex flex-col overflow-hidden rounded-md shadow-sm shadow-gray-300 transition-all duration-300 hover:shadow-md dark:shadow-black lg:flex-row">
                <div className="relative h-80 w-full lg:w-1/3">
                    <Image src={cover} alt="cover image" fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 100vw" priority={false} />
                </div>
                <div className="flex h-60 flex-col justify-between p-4 lg:h-80 lg:w-2/3">
                    <div>
                        <h3 className="mb-3 line-clamp-2 text-2xl font-normal text-gray-300">{title}</h3>
                        <time className="mb-2 mt-2 text-lg text-gray-300">{date}</time>
                    </div>
                    {/* <CategoryList categories={categories} /> */}
                </div>
            </article>
        </Link>
    );
}
