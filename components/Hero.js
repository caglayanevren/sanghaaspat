import { Link, Icon, Stack, Flex, VStack, Box } from '@chakra-ui/react';
import { HiChevronDoubleDown } from 'react-icons/hi';
import Sanghalogo from './Sanghalogo';
import { blur } from '../styles/Hero.module.scss';

export default function Hero({ motto }) {
    return (
        <Flex
            w={'full'}
            h={{ base: '100vh', md: 'calc(100vh - 88px)' }}
            backgroundImage={'url(hero.jpg)'}
            backgroundSize={'cover'}
            backgroundPosition={'20% 50%'}
        >
            <VStack
                id="evrentest"
                w={'full'}
                bgGradient={'linear(to-r, blackAlpha.600, blackAlpha.600)'}
                className={blur}
            >
                <VStack
                    justify={'space-between'}
                    w={'full'}
                    h={'100%'}
                    id="evrentest2"
                    zIndex={'2'}
                >
                    <Box>&nbsp;</Box>
                    <Stack align={'center'} marginTop={0}>
                        <Box
                            width={{ base: '250px', md: '350px' }}
                            height={{ base: '250px', md: '350px' }}
                        >
                            <Sanghalogo />
                        </Box>
                        <Box
                            as="h1"
                            fontSize={{
                                base: '1.5rem',
                                sm: '2rem',
                                md: '2.25rem',
                            }}
                            marginTop={16}
                            mt={5}
                            textAlign={'center'}
                        >
                            {motto}
                        </Box>
                    </Stack>
                    <Link to={'#'}>
                        <Icon boxSize={'2rem'} as={HiChevronDoubleDown} />
                    </Link>
                </VStack>
            </VStack>
        </Flex>
    );
}
