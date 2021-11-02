import { Box } from '@chakra-ui/react';
import { SmallCloseIcon, HamburgerIcon } from '@chakra-ui/icons';

export default function MenuToggle({ toggle, isOpen }) {
    return (
        <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
            {isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
        </Box>
    );
}
