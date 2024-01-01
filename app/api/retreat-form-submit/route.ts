import { NextResponse } from 'next/server';
const { Client } = require('@notionhq/client');
import { getErrorMessage } from '@/utils/get-error-message';

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: `${req.method} requests are not allowed` });
    }
    try {
        const { name, phone, email, message } = await req.json(); //, purpose, newsapprove

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
        return NextResponse.json({ msg: 'Success' });
    } catch (error) {
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }
}
