import '../styles/globals.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from '../styles/theme';
//import '@fontsource/playfair-display/400.css';
//import '@fontsource/playfair-display/600.css';
//import '@fontsource/playfair-display/900.css';
//import '@fontsource/raleway/300.css';
//import '@fontsource/raleway/400.css';
//import '@fontsource/raleway/600.css';
//import '@fontsource/raleway/900.css';

const themes = extendTheme(theme);

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={themes}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
