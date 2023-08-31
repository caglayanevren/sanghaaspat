export type Post = {
    id: string;
    slug: string;
    title: string;
    language: string;
    cover: string;
    imageid: string;
    imageurl: string;
    date: string;
    published: boolean;
    lastEditedAt: number;
    startDate?: string;
};
