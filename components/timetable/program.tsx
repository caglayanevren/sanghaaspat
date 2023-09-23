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
                            program.published && (
                                <Box as="li" mt={{ base: '6', md: '10' }} textAlign={{ base: 'left', sm: 'left', md: 'left', xl: 'left' }} key={program.id}>
                                    <Heading size='md' fontWeight="700">{program.days}</Heading>
                                    {program.body.map((item, index) => {
                                        let elementToRender;
                                        switch (item.type) {
                                            case 'text':
                                                elementToRender = <Text key={index} as='i'>{item.properties?.title[0][0]}</Text>;
                                                break;
                                            case 'header':
                                                elementToRender = <Heading fontWeight="600" size='lg' mt={{ base: '2', md: '4' }} key={index}>{item.properties?.title[0][0]}</Heading>;
                                                break;
                                            case 'sub_header':
                                                elementToRender = <Heading fontWeight="600" size='md' mt={{ base: '2', md: '4' }} key={index}>{item.properties?.title[0][0]}</Heading>;
                                                break;
                                            case 'sub_sub_header':
                                                elementToRender = <Heading fontWeight="600" size='sm' mt={{ base: '2', md: '4' }} key={index}>{item.properties?.title[0][0]}</Heading>;
                                                break;
                                            default:
                                                break;
                                        }
                                        return elementToRender;
                                    })}
                                </Box>
                            )
                        ))}
                    </SimpleGrid>
                ) : (
                    <p className="mt-10 text-center text-lg">No matching program found</p>
                )}
            </Container>
        </Flex>
    );
}
