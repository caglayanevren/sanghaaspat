import Image from 'next/image';
import { Link, Flex, VStack, Box, Heading, Text, Container, Button, GridItem, Grid } from '@chakra-ui/react';
import { imagecontainer, firstSectionContainer } from '../../styles/FirstSection.module.scss';
import firstImage from '../../public/images/about-sangha/about-sangha.jpg';
export default function FirstSection({ title, contents }) {
    return (
        <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="retreats">
            <VStack w={'full'} spacing={12}>
                <Container maxW="container.xl" className={imagecontainer}>
                    <Image className={'image'} src={firstImage} alt={title} layout="responsive" width={1919} height={692} priority={true} />
                </Container>
                <Heading as="h2" fontWeight="400">
                    {title}
                </Heading>
                <Container maxW="container.xl">
                    <Grid
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                        }}
                        gap={12}
                    >
                        <GridItem w="100%" colSpan={{ base: 1, md: 1 }}>
                            <Box
                                sx={{
                                    columnCount: [1, 1, 1, 1],
                                    columnGap: [0, 0, '50px', '80px'],
                                }}
                            >
                                {contents.map((content, i) => (
                                    <Text key={i} marginBottom={8}>
                                        {content}
                                    </Text>
                                ))}
                            </Box>
                        </GridItem>
                        <GridItem w="100%" colSpan={{ base: 1, md: 1 }}>
                            <Box h="100%" bg="gray" w="100%" p={4} color="white">
                                Image
                            </Box>
                        </GridItem>
                    </Grid>
                </Container>
            </VStack>
        </Flex>
    );
}
