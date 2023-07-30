export type Post = {
    id: string;
    slug: string;
    title: string;
    imageid: string;
    categories: string[];
    cover: string;
    imageurl: string;
    date: string;
    published: boolean;
    lastEditedAt: number;
    locale: string;
};
