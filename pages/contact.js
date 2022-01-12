import Head from 'next/head';
const { Client } = require('@notionhq/client');
import Layout from '../components/layout';
import Band from '../components/Band';
import CustomHead from '../components/CustomHead';
import GoogleMaps from '../components/contact/google-map';
import styles from '../styles/Contact.module.scss';
import {
    Link,
    Flex,
    Spacer,
    VStack,
    Box,
    Heading,
    Text,
    Container,
    Button,
    Form,
    Input,
    Textarea,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import en from '../locales/en';
import tr from '../locales/tr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Contact(props) {
    // Input states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    //const [purpose, setPurpose] = useState('');
    const [message, setMessage] = useState('');
    const [pot, setPot] = useState('');
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    const clearState = () => {
        setName('');
        setEmail('');
        setPot('');
        setMessage('');
        const timeout = setTimeout(() => {
            setDisabled(false);
        }, 15000);
    };

    // Form submit handler
    const submitForm = async (e) => {
        e.preventDefault();
        if (pot.length >= 1) {
            console.log('honeypot active!');
            return;
        }
        const res = await fetch('/api/submit-form', {
            method: 'POST',
            body: JSON.stringify({ name, email, message }), //, purpose
        });
        // Success if status code is 201
        if (res.status === 201) {
            toast(`${t.toastThanks}`, { type: 'success' });
            setDisabled(true);
            setTimeout(() => {
                clearState();
            }, 1000);
        } else {
            toast(`${t.toastError}`, { type: 'error' });
        }
    };

    const GMAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;

    return (
        <Layout>
            <CustomHead pageName={process.env.contact} locale={props.locale} />
            <Band />
            <Flex w={'full'} paddingBottom={12} id="contact">
                <Container maxW="container.xl">
                    <h1 className={styles.title}>{t.contactUs}</h1>
                    <p>{t.text}</p>
                    <ToastContainer />
                    <Box display={{ md: 'flex' }}>
                        <Box w={['100%', '100%', '49%', '49%']}>
                            <form className={styles.form} onSubmit={submitForm}>
                                <Input
                                    type="text"
                                    name="pot"
                                    id="pot"
                                    value={pot}
                                    onChange={(e) => setPot(e.target.value)}
                                    className={styles.pot}
                                    tabIndex="-1"
                                    autoComplete="off"
                                />
                                <div>
                                    <FormLabel htmlFor="name">
                                        {t.fullName}
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={t.fullNamePlaceholder}
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <FormLabel htmlFor="email">
                                        {t.email}
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder={t.emailPlaceholder}
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <FormLabel htmlFor="message">
                                        {t.message}
                                    </FormLabel>
                                    <Textarea
                                        name="message"
                                        id="message"
                                        rows="5"
                                        placeholder={t.messagePlaceholder}
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        required
                                    ></Textarea>
                                </div>
                                <Flex>
                                    <Button
                                        disabled={disabled}
                                        className={styles.btn}
                                        type="submit"
                                    >
                                        {t.submit}
                                    </Button>
                                    {/* <Text>{t.disabled}</Text> */}
                                </Flex>
                            </form>
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
