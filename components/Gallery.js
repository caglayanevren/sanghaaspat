import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';

const Viewer = dynamic(() => import('react-viewer'), { ssr: false });

export default function Gallery({ images }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewerVisible, setviewerVisible] = useState(false);
    return (
        <Container maxW="container.xl">
            <SimpleGrid columns={{ base: '1', sm: '2', md: '4', lg: '6', xl: '6' }} spacing={10}>
                <>
                    {images.map((item, index) => {
                        return (
                            <div key={index.toString()}>
                                <Image
                                    alt={item.alt}
                                    src={item.src}
                                    layout="responsive"
                                    width={300}
                                    height={300}
                                    objectFit="cover"
                                    onClick={() => {
                                        setviewerVisible('true');
                                        setActiveIndex(index);
                                    }}
                                    priority={false}
                                />
                            </div>
                        );
                    })}
                </>
                <Viewer
                    visible={viewerVisible}
                    onClose={() => {
                        setviewerVisible(false);
                    }}
                    images={images}
                    zoomable={false}
                    rotatable={false}
                    scalable={false}
                    noToolbar={false}
                    noNavbar={true}
                    drag={false}
                    showTotal={false}
                    disableMouseZoom={true}
                    activeIndex={activeIndex}
                />
            </SimpleGrid>
        </Container>
    );
}
