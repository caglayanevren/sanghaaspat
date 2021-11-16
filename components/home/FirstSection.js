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
import { useRouter } from 'next/router';
import { imagecontainer } from '../../styles/FirstSection.module.scss';

export default function FirstSection({ title, contents, contentlength }) {
    var contentItemNumber = contentlength - 2;
    const router = useRouter();
    const { locale } = router;
    return (
        <Flex w={'full'} paddingY={12} id="sangha">
            <VStack w={'full'} spacing={12}>
                <Heading as="h2" fontWeight="400">
                    {title}
                </Heading>
                <Container maxW="container.xl" className={imagecontainer}>
                    <Image
                        className={'image'}
                        src="/images/home/about-sangha.jpg"
                        alt="About Sangha"
                        layout="responsive"
                        width={1919}
                        height={692}
                    />
                </Container>
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
                <Container maxW="container.xl" align="center">
                    <Link
                        href={
                            locale === 'en'
                                ? '/sangha'
                                : locale === 'tr'
                                ? '/tr/sangha'
                                : 'lang error'
                        }
                    >
                        <Button variant="outline">
                            {locale === 'en'
                                ? 'More Information'
                                : locale === 'tr'
                                ? 'Daha Fazlası'
                                : 'lang error'}
                        </Button>
                    </Link>
                </Container>
            </VStack>
        </Flex>
    );
}
