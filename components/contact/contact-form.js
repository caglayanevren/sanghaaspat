import {
    Flex,
    Button,
    Input,
    Textarea,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import 'react-toastify/dist/ReactToastify.min.css';
import en from '../../locales/en';
import tr from '../../locales/tr';
import styles from '../../styles/ContactForm.module.scss';

export default function ContactForm(params) {
    // Input states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [pot, setPot] = useState('');
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    const clearState = () => {
        setName('');
        setEmail('');
        setPhone('');
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
            body: JSON.stringify({ name, phone, email, message }), //, purpose
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

    return (
        <>
            <ToastContainer />
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
                    <FormLabel htmlFor="name">{t.fullName}</FormLabel>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={t.fullNamePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <FormControl id="phone">
                    <FormLabel htmlFor="phone">{t.phone}</FormLabel>
                    <Input
                        as={InputMask}
                        mask="999 999 99 99"
                        maskChar={null}
                        type="phone"
                        name="phone"
                        placeholder={t.phonePlaceholder}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormControl>
                <div>
                    <FormLabel htmlFor="email">{t.email}</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        placeholder={t.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <FormLabel htmlFor="message">{t.message}</FormLabel>
                    <Textarea
                        name="message"
                        id="message"
                        rows="5"
                        placeholder={t.messagePlaceholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></Textarea>
                </div>
                <Flex>
                    <Button
                        disabled={disabled}
                        //className={styles.btn}
                        type="submit"
                    >
                        {t.submit}
                    </Button>
                    {/* <Text>{t.disabled}</Text> */}
                </Flex>
            </form>
        </>
    );
}
