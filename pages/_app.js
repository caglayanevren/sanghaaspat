import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';
import '@/styles/app/globals.css';
import '@/styles/app/notion.css';
import '@/styles/app/paginate.css';

import '../styles/globals.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from '../styles/theme';
import Provider from '../components/provider';

const themes = extendTheme(theme);

function MyApp({ Component, pageProps }) {
    return (
            <Provider>
                <ChakraProvider theme={themes}>
                        <Component {...pageProps} />
                </ChakraProvider>
            </Provider>
    );
}

export default MyApp;
