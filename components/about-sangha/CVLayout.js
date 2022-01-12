import Image from 'next/image';
import {
    Link,
    Flex,
    VStack,
    HStack,
    Stack,
    Box,
    Heading,
    Text,
    Container,
    Button,
    Spacer,
} from '@chakra-ui/react';
import {
    imagecontainer,
    //firstSectionContainer,
} from '../../styles/CVLayout.module.scss';

export default function CVLayout({
    title,
    degree,
    contents = [],
    name,
    CVImage,
}) {
    return (
        <Flex w={'full'} paddingBottom={12} id={`${name}_cv`}>
            <Container maxW="container.lg">
                <VStack w={'full'} spacing={12} alignItems="flex-start">
                    <Flex direction="column">
                        <Heading as="h2" fontWeight="400">
                            {title}
                        </Heading>
                        <Heading as="h4" size="md" fontWeight="400">
                            {degree}
                        </Heading>
                    </Flex>
                    <Stack
                        spacing={10}
                        direction={{ base: 'column-reverse', md: 'row' }}
                    >
                        <Box flex="1">
                            {contents.map((content, i) => (
                                <Text key={i} marginBottom={4}>
                                    {content}
                                </Text>
                            ))}
                        </Box>
                        <Box flex="1" className={imagecontainer}>
                            <Image
                                className={'image'}
                                //src={`/images/about-sangha/${name}.jpg`}
                                src={CVImage}
                                alt={title}
                                layout="responsive"
                                width={555}
                                height={740}
                                placeholder="blur"
                                blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            />
                        </Box>
                    </Stack>
                </VStack>
            </Container>
        </Flex>
    );
}
