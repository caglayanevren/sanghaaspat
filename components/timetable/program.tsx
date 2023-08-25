'use client';

import { useRef } from 'react';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon, Stack, Center } from '@chakra-ui/react';
import { Program } from '@/types/program';

export default function ProgramGrid({ allPrograms, title, locale }: { allPrograms: Program[], title: string, locale: string }) {
    const rootRef = useRef<HTMLDivElement>(null);

    return (
        <Flex bgColor="gray.900" w={'full'} pb={12} pt={12} id={`sanghaprogram_${locale}`} ref={rootRef}>
            <Container maxW="container.xl">
                <Heading as="h2" fontWeight="400" mb={0}>{title}</Heading>
                {allPrograms.length ? (
                    <SimpleGrid as='ul' columns={{ sm: 2, md: 3, xl: 5 }} columnGap={6}>
                        {allPrograms.map((program) => (
                            <Box as='li' mt={8} textAlign={{ base: 'left', sm: 'left', md: 'left', xl: 'left' }} key={program.id}>
                                <Text fontWeight="700">{program.days}</Text>
                                <Text fontSize={'xl'}>{program.classes}</Text>
                                <Text><i>{program.time}</i></Text>
                                <Text><i>{program.place}</i></Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <p className="mt-10 text-center text-lg">No matching program found</p>
                )}
            </Container>
        </Flex>
    );
}
