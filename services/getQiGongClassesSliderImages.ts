import { getRecordMap, mapImageUrl } from '@/lib/notionapi';
import { Post } from '@/types/post';

export async function getAllImagesFromQiGongClassesSlider() {
    const allPosts: Post[] = [];
    const recordMap = await getRecordMap(process.env.QIGONG_CLASSES_SLIDER_ID!);
    const { block, collection } = recordMap;
    const schema = Object.values(collection)[0].value.schema;
    const propertyMap: Record<string, string> = {};

    Object.keys(schema).forEach((key) => {
        propertyMap[schema[key].name] = key;
    });

    Object.keys(block).forEach((pageId) => {
        if (
            block[pageId].value.type === 'page'
            && block[pageId].value.properties[propertyMap['Image']]
            && block[pageId].value.properties[propertyMap['Published']][0][0] === 'Yes'
        ) {
            const { properties, last_edited_time } = block[pageId].value;

            const contents = block[pageId].value.content || [];
            const dates = contents.map((content) => {
                return block[content]?.value?.last_edited_time;
            });
            dates.push(last_edited_time);
            dates.sort((a, b) => b - a);
            const lastEditedAt = dates[0];

            const id = pageId;
            const imageid = properties[propertyMap['ImageId']][0][0];
            const images = properties[propertyMap['Image']][0][1][0][1];
            const published = properties[propertyMap['Published']][0][0] === 'Yes';

            allPosts.push({
                id,
                imageid: imageid || '',
                imageurl: mapImageUrl(images, block[pageId].value) || '',
                published,
                lastEditedAt,
                slug: '',
                title: '',
                language: '',
                cover: '',
                date: ''
            });
        }
    });

    return allPosts;
}
