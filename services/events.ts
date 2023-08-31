import { getRecordMap, mapImageUrl } from '@/libs/notion';
import { Post } from '@/types/post';
import { Interval, DateTime } from 'luxon';

export async function getAllPostsFromNotion() {
    const allPosts: Post[] = [];
    const recordMap = await getRecordMap(process.env.NOTION_DATABASE_ID!);
    const { block, collection } = recordMap;
    const schema = Object.values(collection)[0].value.schema;
    const propertyMap: Record<string, string> = {};

    Object.keys(schema).forEach((key) => {
        propertyMap[schema[key].name] = key;
    });

    Object.keys(block).forEach((pageId) => {
        if (block[pageId].value.type === 'page' && block[pageId].value.properties[propertyMap['Slug']]) {
            const { properties, last_edited_time } = block[pageId].value;

            const contents = block[pageId].value.content || [];
            const dates = contents.map((content) => {
                return block[content]?.value?.last_edited_time;
            });
            dates.push(last_edited_time);
            dates.sort((a, b) => b - a);
            const lastEditedAt = dates[0];

            const id = pageId;
            const slug = properties[propertyMap['Slug']][0][0];
            const title = properties[propertyMap['Page']][0][0];
            const language = properties[propertyMap['Lang']][0][0];
            const cover = properties[propertyMap['Cover']][0][1][0][1];
            const published = properties[propertyMap['Published']][0][0] === 'Yes';
            let date = "";
            const datePath = (p: string) => properties[propertyMap['Date']][0][1][0][1][p];
            const format:{ day: "2-digit" | "numeric" | undefined, month: 'long' | 'short', year: "2-digit" | "numeric" | undefined, hour: "2-digit" | "numeric" | undefined, minute: "2-digit" | "numeric" | undefined} = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }; 
            const dateType = datePath('type');
            const startDate = datePath('start_date');
            const startTime = datePath('start_time');
            const endDate = datePath('end_date');
            const endTime = datePath('end_time');
            switch (dateType) {
                case "date":
                    date = DateTime.fromISO(startDate).toLocaleString(DateTime.DATE_FULL, { locale: language });
                    break;
                case "datetime":
                    date = DateTime.fromISO(startDate.concat("T",startTime)).toLocaleString(format, { locale: language });
                    break;
                case "daterange":
                    date = Interval.fromISO(startDate.concat("/",endDate)).toLocaleString(DateTime.DATE_FULL, { locale: language });
                    break;
                case "datetimerange":
                    date = Interval.fromISO(startDate.concat("T",startTime,"/",endDate,"T",endTime)).toLocaleString(format, { locale: language });
                    break;
                default:
                    date = startDate;
                    break;
            }
            // console.log("DATE1: ", date)
            allPosts.push({
                id,
                title,
                slug,
                language,
                // Fix 403 error for images.
                // https://github.com/NotionX/react-notion-x/issues/211
                cover: mapImageUrl(cover, block[pageId].value) || '',
                date,
                published,
                lastEditedAt,
                imageid: '',
                imageurl: '',
                startDate
            });
        }
    });
    return allPosts;
}
