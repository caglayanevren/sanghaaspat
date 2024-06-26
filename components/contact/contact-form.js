import { Flex, Button, Input, Textarea, FormControl, FormLabel, chakra, Checkbox } from '@chakra-ui/react';
import { useState, useRef } from 'react';
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
    const [newsapprove, setNewsapprove] = useState(true);
    const [phone, setPhone] = useState(' ');
    const [message, setMessage] = useState('');
    const [pot, setPot] = useState('');
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    const clearState = () => {
        setName('');
        setEmail('');
        setNewsapprove(true);
        setPhone(' ');
        setPot('');
        setMessage('');
        const timeout = setTimeout(() => {
            setDisabled(false);
        }, 15000);
    };

    let btnRef = useRef();

    // Form submit handler
    const submitForm = async (e) => {
        e.preventDefault();
        if (btnRef.current) {
            btnRef.current.setAttribute('disabled', 'disabled');
        }
        if (pot.length >= 1) {
            console.log('honeypot active!');
            return;
        }
        const res = await fetch('/api/submit-form', {
            method: 'POST',
            body: JSON.stringify({
                name,
                phone,
                email,
                newsapprove,
                message,
            }),
        });
        // Success if status code is 201 or 200
        if (res.status === 201 || res.status === 200) {
            toast(`${t.contact.toastThanks}`, { type: 'success' });
            setDisabled(true);
            setTimeout(() => {
                clearState();
            }, 1000);
        } else {
            toast(`${t.contact.toastError}`, { type: 'error' });
        }
    };

    return (
        <>
            <ToastContainer />
            <form className={styles.form} onSubmit={submitForm}>
                <Input type="text" name="pot" id="pot" value={pot} onChange={(e) => setPot(e.target.value)} className={styles.pot} tabIndex="-1" autoComplete="off" />
                <div>
                    <chakra.p mb={4} fontWeight={'semibold'}>
                        {t.contact.text}
                    </chakra.p>
                </div>
                <div>
                    <FormLabel htmlFor="name">{t.contact.fullName}</FormLabel>
                    <Input autoComplete="true" type="text" id="name" name="name" placeholder={t.contact.fullNamePlaceholder} value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <FormControl id="phone">
                    <FormLabel htmlFor="phone">{t.contact.phone}</FormLabel>
                    <Input autoComplete="true" as={InputMask} mask="999 999 99 99" maskChar={null} type="phone" name="phone" placeholder={t.contact.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </FormControl>
                <div className={styles.checkBox}>
                    <FormLabel htmlFor="email">{t.contact.emailText}</FormLabel>
                    <Input autoComplete="true" id="email" type="email" name="email" placeholder={t.contact.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Checkbox id="newsletter_approve" size="md" colorScheme="white" onChange={(e) => setNewsapprove(e.target.checked)} defaultChecked>
                        {t.contact.newsapproveCheckText}
                    </Checkbox>
                </div>
                <div>
                    <FormLabel htmlFor="message">{t.contact.message}</FormLabel>
                    <Textarea name="message" id="message" rows="5" placeholder={t.contact.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} required></Textarea>
                </div>
                <Flex>
                    <Button
                        disabled={disabled}
                        //className={styles.btn}
                        type="submit"
                        ref={btnRef}
                    >
                        {t.contact.submit}
                    </Button>
                    {/* <Text>{t.contact.disabled}</Text> */}
                </Flex>
            </form>
        </>
    );
}
