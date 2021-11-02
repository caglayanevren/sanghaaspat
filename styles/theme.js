export default {
    colors: {
        primary: '#161E35',
        text: '#FFFFFF',
        eser: '#A6B2EC',
        transparent: 'transparent',
        black: '#000',
        white: '#efefef',
        gray: {
            50: '#f7fafc',
            700: '#3F3F3F',
            800: '#333333',
            900: '#333333',
        },
    },
    initialColorMode: 'dark',
    useSystemColorMode: true,
    fonts: {
        heading: 'Playfair Display',
        body: 'Raleway',
    },
    styles: {
        global: {
            body: {
                bg: 'gray.700',
                color: 'white',
            },
            a: {
                color: 'eser',
                _hover: {
                    textDecoration: 'underline',
                },
            },
        },
    },
};
