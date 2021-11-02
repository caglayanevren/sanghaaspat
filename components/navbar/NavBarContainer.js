import { Flex } from '@chakra-ui/react';

export default function NavBarContainer({ children, isOpen, ...props }) {
    return (
        <Flex
            as="nav"
            align={{
                base: isOpen ? 'flex-start' : 'center',
                md: 'center',
            }}
            justify={['flex-end', 'flex-end', 'center', 'center']}
            wrap="wrap"
            w="100%"
            h={{
                base: isOpen ? '100vh' : 'auto',
                md: 'auto',
            }}
            p={8}
            bg={{
                base: isOpen ? 'gray.800' : 'transparent',
                md: 'transparent',
            }}
            //color={['white', 'white', 'primary.700', 'primary.700']}
            {...props}
        >
            {children}
        </Flex>
    );
}
