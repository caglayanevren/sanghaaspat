import Image from 'next/image';
import {
    //Image,
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
    Icon
} from '@chakra-ui/react';
import {
    imagecontainer,
    //firstSectionContainer,
} from '../../styles/Triple.module.scss';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useRouter } from 'next/router';

export function Sek({ title, text, name, link }) {
    return (
        <VStack spacing={8} direction="column" alignItems="flex-start">
            <Box className={imagecontainer}>
                <Image
                    className={'image'}
                    src={`/images/home/${name}.jpg`}
                    alt={title}
                    layout="responsive"
                    width={350}
                    height={257}
                    rounded={8}
                />
            </Box>
            <Heading as="h2" fontWeight="400">
                {title}
            </Heading>
            <Text>{text}</Text>
            <Link href={link}>
                <Icon
                    marginBottom={4}
                    boxSize={'1.5rem'}
                    as={HiOutlineArrowNarrowRight}
                />
            </Link>
        </VStack>
    );
}

export default function Triple({
    sanghatitle,
    qigongtitle,
    tqhtitle,
    sanghatext,
    qigongtext,
    tqhtext,
}) {
    const router = useRouter();
    const {locale}= router;
    return (
        <Flex w={'full'} pb={0} pt={6} id="sangha">
            <Container maxW="container.xl">
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    w={'full'}
                    paddingY={16}
                    spacing={12}
                >
                    <Sek title={sanghatitle} text={sanghatext} name="sangha" link={locale==='en' ? process.env.aboutSangha.english.path : `/tr${process.env.aboutSangha.turkish.path}`} />
                    <Sek title={qigongtitle} text={qigongtext} name="qigong" link={locale==='en' ? process.env.qigongClasses.english.path : `/tr${process.env.qigongClasses.turkish.path}`} />
                    <Sek title={tqhtitle} text={tqhtext} name="tqh" />
                </Stack>
            </Container>
        </Flex>
    );
}
