import { getRecordMap } from '@/libs/notion';
import { Program } from '@/types/program';

export async function getAllProgramFromNotion(locale: string) {
    const dbid = locale === 'en' ? process.env.SANGHAASPAT_EN_PROGRAM_DATABASE_ID : locale === 'tr' ? process.env.SANGHAASPAT_TR_PROGRAM_DATABASE_ID : 'lang error';
    const allProgram: Program[] = [];
    const recordMap = await getRecordMap(dbid!);
    const { block, collection } = recordMap;
    const schema = Object.values(collection)[0].value.schema;
    const propertyMap: Record<string, string> = {};

    Object.keys(schema).forEach((key) => {
        propertyMap[schema[key].name] = key;
    });

    Object.keys(block).forEach((pageId) => {
        if (block[pageId].value.type === 'page' && block[pageId].value.properties[propertyMap['Days']]) {
            const { properties, last_edited_time } = block[pageId].value;
            const contents = block[pageId].value.content || [];
            const dates = contents.map((content) => {
                return block[content]?.value?.last_edited_time;
            });
            const body = contents.map((content) => {
                return block[content]?.value
            });
            dates.push(last_edited_time);
            dates.sort((a, b) => b - a);
            const lastEditedAt = dates[0];
            //console.log("dates:", dates);
            const id = pageId;
            const sort = properties[propertyMap['Sort']][0][0];
            const days = properties[propertyMap['Days']][0][0];
            const published = properties[propertyMap['Published']][0][0] === 'Yes';
            //const classes = properties[propertyMap['Classes']][0][0];
            //const time = properties[propertyMap['Time']][0][0];
            //const place = properties[propertyMap['Place']][0][0];
            allProgram.push({
                id,
                sort,
                days,
                body,
                published,
                //classes,
                //time,
                //place,
                lastEditedAt,
            });
        }
    });
    return allProgram;
}
