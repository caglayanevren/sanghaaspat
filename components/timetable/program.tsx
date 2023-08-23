'use client';

import { useRef } from 'react';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Icon, Stack } from '@chakra-ui/react';
import { Program } from '@/types/program';

export default function PostsGrid({ allProgram }: { allProgram: Program[] }) {
    const rootRef = useRef<HTMLDivElement>(null);

    return (
        <Flex w={'full'} pb={6} pt={6} id="sanghaprogram" ref={rootRef}>
            <Container maxW="container.xl">
                {allProgram.length ? (
                    <Stack as='ul' direction={{ base: 'column', md: 'row' }} w={'full'} spacing={12}>
                        {allProgram.map((program) => (
                            <li key={program.id}>
                                <Text>{program.days}</Text>
                                <Text>{program.classes}</Text>
                                <Text>{program.time}</Text>
                                <Text>{program.place}</Text>
                            </li>
                        ))}
                    </Stack>
                ) : (
                    <p className="mt-10 text-center text-lg">No matching program found</p>
                )}
            </Container>
        </Flex>
    );
}
