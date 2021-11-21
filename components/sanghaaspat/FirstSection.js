import Image from 'next/image';
import {
    Link,
    Flex,
    VStack,
    Box,
    Heading,
    Text,
    Container,
    Button,
} from '@chakra-ui/react';
import {
    imagecontainer,
    firstSectionContainer,
} from '../../styles/FirstSection.module.scss';

export default function FirstSection({ title, contents }) {
    return (
        <Flex
            w={'full'}
            className={firstSectionContainer}
            paddingBottom={12}
            id="aboutsangha"
        >
            <VStack w={'full'} spacing={12}>
                <Container maxW="container.xl" className={imagecontainer}>
                    <Image
                        className={'image'}
                        src="/images/home/about-sangha.jpg"
                        alt={title}
                        layout="responsive"
                        width={1919}
                        height={692}
                        priority={true}
                    />
                </Container>
                <Heading as="h2" fontWeight="400">
                    {title}
                </Heading>
                <Container maxW="container.xl">
                    <Box
                        sx={{
                            columnCount: [1, 1, 2, 2],
                            columnGap: [0, 0, '50px', '80px'],
                        }}
                    >
                        {contents.map((content, i) => (
                            <Text key={i} marginBottom={8}>
                                {content}
                            </Text>
                        ))}
                    </Box>
                </Container>
            </VStack>
        </Flex>
    );
}
