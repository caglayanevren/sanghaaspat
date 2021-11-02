import { Box, Stack, Link, Icon } from '@chakra-ui/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { SunIcon } from '@chakra-ui/icons';
//import ChangeColorMode from './ChangeColorMode';
import MenuItem from './MenuItem';

export default function MenuLinks({ isOpen }) {
    return (
        <Box
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={['center', 'space-between', 'flex-end', 'flex-end']}
                direction={['column', 'column', 'row', 'row']}
                pt={[4, 4, 0, 0]}
            >
                <MenuItem to="/">
                    <SunIcon />
                </MenuItem>
                <MenuItem to="/sangha">About Sangha</MenuItem>
                <MenuItem to="/classes">Classes</MenuItem>
                <MenuItem to="/qi-massage">Qi Massage</MenuItem>
                <MenuItem to="/events">Events</MenuItem>
                <MenuItem to="/reviews">Reviews</MenuItem>
                <MenuItem to="/contact">Contact</MenuItem>
                {/* <ChangeColorMode /> */}
                <Stack direction={'row'}>
                    <Link to="#">
                        <Icon as={FaFacebook} />
                    </Link>
                    <Link to="#">
                        <Icon as={FaInstagram} />
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
}
