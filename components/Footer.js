import { Link, Flex, VStack, Box, Heading, Text, Container, Button, Center } from '@chakra-ui/react';
//import {  } from '../../styles/Footer.module.scss';

export default function Footer() {
    const year = new Date();
    return (
        <Flex id="footer" w={'full'} paddingY={12} bgColor="gray.900" marginTop={12}>
            <Container maxW="container.xl">
                <Center>2022-{year.getFullYear()} &copy;</Center>
            </Container>
        </Flex>
    );
}
