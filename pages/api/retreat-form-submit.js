const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: `${req.method} requests are not allowed` });
    }
    try {
        const { name, phone, email, message } = JSON.parse(req.body); //, purpose, newsapprove
        //const response = await notion.users.list();
        //console.log(response);

        //const pageId = '315cf727703d473888a89132a28b06e9';
        //const response = await notion.pages.retrieve({ page_id: pageId });
        //console.log(response.properties.Notify.people);

        await notion.pages.create({
            parent: {
                database_id: process.env.SANGHAASPAT_RETREAT_SUBMISSIONS_DATABASE_ID,
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                Email: {
                    email: email,
                },
                /* 'NewsLetter Approved': {
                    checkbox: newsapprove,
                }, */
                Phone: {
                    phone_number: phone,
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: message,
                            },
                        },
                    ],
                },
                Notify: {
                    people: [
                        {
                            object: 'user',
                            id: 'a1234aa4-7733-43f3-b7ec-73d5bc86b94e',
                            //name: 'Zeynep',
                            //type: 'person',
                            //person: {
                            //    email: 'zeyneporalg@hotmail.com',
                            //},
                        },
                        {
                            object: 'user',
                            id: 'd2aaa4cc-3fba-49d4-a7b6-bba2ddf081ed',
                            //name: 'Duygu',
                            //type: 'person',
                            //person: {
                            //    email: 'duygusagit@gmail.com',
                            //},
                        },
                    ],
                },
            },
        });
        res.status(201).json({ msg: 'Success' });
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}
