const Button = {
    // The styles all button have in common
    baseStyle: {
        fontWeight: 'normal',
        textTransform: 'none',
        borderRadius: 6, // <-- border radius is same for all variants and sizes
        mt: 3,
    },
    // Two sizes: sm and md
    sizes: {
        sm: {
            fontSize: 'md',
            px: 4, // <-- px is short for paddingLeft and paddingRight
            py: 4, // <-- py is short for paddingTop and paddingBottom
        },
        md: {
            fontSize: 'lg',
            px: 6, // <-- these values are tokens from the design system
            py: 4, // <-- these values are tokens from the design system
        },
    },
    // Two variants: outline and solid
    variants: {
        outline: {
            border: '1px solid',
            borderColor: 'white',
            color: 'white',
            _hover: {
                textDecoration: 'none',
                backgroundColor: 'gray.900',
            },
        },
        solid: {
            bg: 'purple.500',
            color: 'white',
            _hover: {
                textDecoration: 'none',
                backgroundColor: 'gray.900',
            },
        },
    },
    // The default size and variant values
    defaultProps: {
        size: 'sm',
        variant: 'outline',
    },
};

export default {
    components: {
        Button,
    },
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
        //heading: 'Playfair Display',
        heading: 'Raleway',
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
