const { Client } = require('@notionhq/client');
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Band from '../components/Band';
import CustomHead from '../components/CustomHead';
import GoogleMaps from '../components/contact/google-map';
import ContactForm from '../components/contact/contact-form';
import { Flex, Spacer, Box, Container, chakra } from '@chakra-ui/react';
import { InfoIcon, EmailIcon } from '@chakra-ui/icons';
import en from '../locales/en';
import tr from '../locales/tr';
import styles from '../styles/ContactPage.module.scss';

export default function Contact(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    const GMAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;

    return (
        <Layout>
            <CustomHead pageName={process.env.contact} locale={locale} />
            <Band />
            <Flex w={'full'} paddingBottom={12} id="contact">
                <Container maxW="container.xl">
                    <h1 className={styles.title}>{t.contact.contactUs}</h1>
                    <chakra.p>
                        <InfoIcon /> {t.contact.address}
                    </chakra.p>
                    <chakra.p>
                        <EmailIcon /> {t.contact.email}
                    </chakra.p>
                    <Box display={{ md: 'flex' }}>
                        <Box w={['100%', '100%', '49%', '49%']}>
                            <ContactForm />
                        </Box>
                        <Spacer w={['100%', '30px', '30px', '30px']} />
                        <Box w={['100%', '100%', '49%', '49%']}>
                            <GoogleMaps
                                className={styles.map}
                                apikey={GMAP_API_KEY}
                            />
                        </Box>
                    </Box>
                </Container>
            </Flex>
        </Layout>
    );
}
