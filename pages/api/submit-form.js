const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ message: `${req.method} requests are not allowed` });
    }
    try {
        const { name, phone, email, newsapprove, message } = JSON.parse(
            req.body
        ); //, purpose
        await notion.pages.create({
            parent: {
                database_id:
                    process.env.SANGHAASPAT_CONTACT_SUBMISSIONS_DATABASE_ID,
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
                'NewsLetter Approved': {
                    checkbox: newsapprove,
                },
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
            },
        });
        res.status(201).json({ msg: 'Success' });
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}
