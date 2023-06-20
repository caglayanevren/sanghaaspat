import '../styles/globals.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from '../styles/theme';

import { Raleway } from 'next/font/google';

const themes = extendTheme(theme);

const raleway = Raleway({
    weight: ['400', '500', '600', '900'],
    subsets: ['latin-ext'],
});

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={themes} className={raleway.className}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
