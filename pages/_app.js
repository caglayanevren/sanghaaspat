import '../styles/globals.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from '../styles/theme';

const themes = extendTheme(theme);

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={themes}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
