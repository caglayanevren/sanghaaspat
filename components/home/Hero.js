import Image from 'next/image';
import { Link, Icon, Flex, VStack, Box } from '@chakra-ui/react';
import { HiChevronDoubleDown } from 'react-icons/hi';
import Sanghalogo from '../Sanghalogo';
import { blur, bounceicon } from '../../styles/Hero.module.scss';

export default function Hero({ motto }) {
    return (
        <Flex w={'full'} h={{ base: '100vh', md: 'calc(100vh - 88px)' }}>
            <VStack w={'full'} position="relative">
                <Image src="/images/home/hero_v4.jpg" alt="Sangha Aspat" layout="fill" objectFit="cover" objectPosition="center" priority={true} as="image" />
                <VStack
                    w={'full'}
                    //bgGradient={'linear(to-r, blackAlpha.600, blackAlpha.600)'}
                    className={blur}
                >
                    <VStack justify={'space-between'} w={'full'} h={'100%'} zIndex={'2'} spacing="0">
                        <Box>&nbsp;</Box>
                        <VStack align={'center'} spacing="50px">
                            <Box width={{ base: '250px', md: '300px' }} height={{ base: '250px', md: '300px' }}>
                                <Sanghalogo />
                            </Box>
                            <Box
                                as="h1"
                                fontSize={{
                                    base: '1.5rem',
                                    sm: '2rem',
                                    md: '2.25rem',
                                }}
                                textAlign={'center'}
                            >
                                {motto}
                            </Box>
                        </VStack>
                        <Link href="#sangha" aria-label="Down">
                            <Icon className={bounceicon} marginBottom={4} boxSize={'2rem'} as={HiChevronDoubleDown} />
                        </Link>
                    </VStack>
                </VStack>
            </VStack>
        </Flex>
    );
}
