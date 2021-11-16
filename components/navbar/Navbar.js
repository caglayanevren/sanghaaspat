import { Flex } from '@chakra-ui/react';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';
import { useBoolean } from '@chakra-ui/react';

export default function NavBar(props) {
    const [isOpen, setIsOpen] = useBoolean();

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
            p={{ base: '44px', md: 8 }}
            paddingBottom={{ base: null, md: props.pb }}
            bg={{
                base: isOpen ? 'gray.800' : 'transparent',
                md: 'transparent',
            }}
            {...props}
        >
            <MenuToggle toggle={setIsOpen.toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </Flex>
    );
}
