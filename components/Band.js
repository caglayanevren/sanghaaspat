import { Flex, Box } from '@chakra-ui/react';
import Sanghalogo from './Sanghalogo';

export default function Band() {
    return (
        <Flex
            bg={'transparent'}
            w={'100%'}
            position={'relative'}
            align={'center'}
            paddingY={'10px'}
        >
            <Box
                zIndex={0}
                bg="gray.900"
                w={'100%'}
                h={'50px'}
                position={'absolute'}
            >
                &nbsp;
            </Box>
            <Box
                zIndex={1}
                width={{ base: '88px' }}
                height={{ base: '88px' }}
                marginX={'auto'}
            >
                <Sanghalogo />
            </Box>
        </Flex>
    );
}
