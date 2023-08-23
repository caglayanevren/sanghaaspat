import { getRecordMap, mapImageUrl } from '@/libs/notion';
import { Program } from '@/types/program';
import { Interval, DateTime } from 'luxon';

export async function getAllProgramFromNotion() {
    const allProgram: Program[] = [];
    const recordMap = await getRecordMap(process.env.SANGHAASPAT_PROGRAM_DATABASE_ID!);
    const { block, collection } = recordMap;
    const schema = Object.values(collection)[0].value.schema;
    const propertyMap: Record<string, string> = {};
    
    //console.log("block.dbid.value**: ", block['baf54ef6-77a4-444f-b508-b50482c4bc56'].value)
    //console.log("schema**: ", schema)
    //console.log("recordMap**: ", recordMap)

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
            dates.push(last_edited_time);
            dates.sort((a, b) => b - a);
            const lastEditedAt = dates[0];

            const id = pageId;
            const title = properties.title;
            const days = properties[propertyMap['Days']][0][0];
            const classes = properties[propertyMap['Classes']][0][0];
            const time = properties[propertyMap['Time']][0][0];
            const place = properties[propertyMap['Place']][0][0];
            //console.log("block[pageId].value: ", block[pageId].value)
            allProgram.push({
                id,
                title,
                days,
                classes,
                time,
                place,
                lastEditedAt,
            });
        }
    });
    return allProgram;
}
