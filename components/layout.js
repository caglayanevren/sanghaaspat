import NavBar from './navbar/Navbar';
import { Link, Flex, VStack, Box, Heading, Text, Container, Button, Wrap } from '@chakra-ui/react';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <NavBar position={{ base: 'absolute', md: 'relative' }} zIndex={3} pb={1} />
            <Box
                id="main"
                minHeight={{
                    base: 'calc(100vh - 116px)',
                    md: 'calc(100vh - 176px)',
                }}
            >
                {children}
            </Box>
            <Footer />
        </>
    );
}
