import { Block } from "notion-types";
export type Program = {
    id: string;
    sort: number;
    days: string;
    published: boolean;
    body: Block[];
    lastEditedAt: number;
};
