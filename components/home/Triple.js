import Image from 'next/image';
import { Link, Flex, VStack, Stack, Box, Heading, Text, Container, Icon } from '@chakra-ui/react';
import { imagecontainer } from '../../styles/Triple.module.scss';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useRouter } from 'next/router';
import sanghaImage from '../../public/images/home/sangha.jpg';
import qigongImage from '../../public/images/home/qigong.jpg';
import tqhImage from '../../public/images/home/tqh.jpg';

export function Sek({ title, text, imagesrc, link }) {
    return (
        <VStack width={{ base: '100%', md: '33.33%' }} spacing={2} direction="column" alignItems="flex-start" justifyContent="space-between">
            <Box className={imagecontainer} mb={8}>
                <Image className={'image'} src={imagesrc} alt={title} layout="responsive" width={350} height={257} rounded={8} placeholder="blur" blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            </Box>
            <VStack h="100%" spacing={2} direction="column" alignItems="flex-start" justifyContent="space-between">
                <Box mb={4}>
                    <Heading as="h2" fontWeight="400" mb={4}>
                        {title}
                    </Heading>
                    <Text>{text}</Text>
                </Box>
                <Link href={link} aria-label={title}>
                    <Icon marginBottom={4} boxSize={'1.5rem'} as={HiOutlineArrowNarrowRight} />
                </Link>
            </VStack>
        </VStack>
    );
}

export default function Triple({ sanghatitle, qigongtitle, tqhtitle, sanghatext, qigongtext, tqhtext }) {
    const router = useRouter();
    const { locale } = router;
    return (
        <Flex w={'full'} pb={0} pt={6} id="sangha">
            <Container maxW="container.xl">
                <Stack direction={{ base: 'column', md: 'row' }} w={'full'} paddingY={16} spacing={12}>
                    <Sek title={sanghatitle} text={sanghatext} imagesrc={sanghaImage} link={locale === 'en' ? process.env.aboutSangha.english.path : `/tr${process.env.aboutSangha.turkish.path}`} />
                    <Sek title={qigongtitle} text={qigongtext} imagesrc={qigongImage} link={locale === 'en' ? process.env.qigongClasses.english.path : `/tr${process.env.qigongClasses.turkish.path}`} />
                    <Sek title={tqhtitle} text={tqhtext} imagesrc={tqhImage} link={locale === 'en' ? process.env.aboutSangha.english.path : `/tr${process.env.aboutSangha.turkish.path}`} />
                </Stack>
            </Container>
        </Flex>
    );
}
