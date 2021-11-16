import {
    Link,
    Flex,
    VStack,
    Box,
    Heading,
    Text,
    Container,
    Button,
    Center,
} from '@chakra-ui/react';
//import {  } from '../../styles/Footer.module.scss';

export default function Footer() {
    return (
        <Flex id="footer" w={'full'} paddingY={12} bgColor="gray.900">
            <Container maxW="container.xl">
                <Center>2021 &copy;</Center>
            </Container>
        </Flex>
    );
}
