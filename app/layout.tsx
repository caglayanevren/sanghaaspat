import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import Provider from '@/components/provider';
import '@/styles/app/globals.css';
import '@/styles/app/paginate.css';

export const metadata = {
    title: {
        default: 'Sangha Aspat',
        template: '%s | Sangha Aspat',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="text-primary bg-primary relative mx-auto mb-20 flex w-full max-w-screen-xl flex-col px-[10vw] md:px-[5vw]">
                <Provider>
                    <main>{children}</main>
                </Provider>
            </body>
        </html>
    );
}
