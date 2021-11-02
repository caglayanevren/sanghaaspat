const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {
    //const pageId = 'd1d98caeb9264fc080b233bc00db0f02';
    const pageId = '6081420da2c4414594e537374c54fe4c';
    //const pageId = '443f135100da45018602c25da471a94d';
    //const response = await notion.pages.retrieve({ page_id: pageId });
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
    });
    //const re = response.results;
    res.status(200).json({ response });
};
