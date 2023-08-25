import { useState } from 'react';
import { decode } from 'html-entities';
import { useRouter } from 'next/router';
import {
    Link,
    Flex,
    VStack,
    Stack,
    Box,
    Heading,
    Text,
    Container,
    Icon,
    Input,
    Button,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react';
import en from '../../locales/en';
import tr from '../../locales/tr';
import { WarningIcon } from '@chakra-ui/icons';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const NewsletterForm = ({ status, message, onValidated }) => {
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    /**
     * Handle form submit.
     *
     * @return {{value}|*|boolean|null}
     */
    const handleFormSubmit = () => {
        setError(null);

        if (!email || !firstName || !lastName) {
            setError(t.newsletterSubscribe.fillAllInfos);
            return null;
        }

        const isFormValidated = onValidated({ EMAIL: email, FNAME: firstName, LNAME: lastName });

        // On success return true
        return email && firstName && lastName && email.indexOf('@') > -1 && isFormValidated;
    };

    /**
     * Handle Input Key Event.
     *
     * @param event
     */
    const handleInputKeyEvent = (event) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit();
        }
    };

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    const getMessage = (message) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ('0' !== result?.[0]?.trim()) {
            return decode(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? decode(formattedMessage) : null;
    };

    return (
        <Flex w={'full'} pb={0} pt={12} id="sanghasubscribe">
            <Container maxW="container.xl">
                <Stack direction={{ base: 'column', md: 'row' }} w={'full'} spacing={12}>
                    <Heading as="h2" fontWeight="400" mb={6}>
                        {t.newsletterSubscribe.title}
                    </Heading>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} w={'full'} paddingBottom={0} spacing={12}>
                    <Input
                        type="text"
                        placeholder={t.newsletterSubscribe.firstName}
                        _placeholder={{ opacity: 1, color: 'gray.300' }}
                        size="lg"
                        onChange={(event) => setFirstName(event?.target?.value ?? '')}
                        onKeyUp={(event) => handleInputKeyEvent(event)}
                    />
                    <Input
                        type="text"
                        placeholder={t.newsletterSubscribe.lastName}
                        _placeholder={{ opacity: 1, color: 'gray.300' }}
                        size="lg"
                        onChange={(event) => setLastName(event?.target?.value ?? '')}
                        onKeyUp={(event) => handleInputKeyEvent(event)}
                    />
                    <Input
                        type="email"
                        placeholder={t.newsletterSubscribe.yourEmail}
                        _placeholder={{ opacity: 1, color: 'gray.300' }}
                        size="lg"
                        onChange={(event) => setEmail(event?.target?.value ?? '')}
                        onKeyUp={(event) => handleInputKeyEvent(event)}
                    />
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} w={'full'} paddingY={4} spacing={12}>
                    {'sending' === status ? <Text color="blue.600">{t.newsletterSubscribe.sending}</Text> : null}
                    {'error' === status || error ? <Text color="red.600">{t.newsletterSubscribe.error}</Text> : null}
                    {'success' === status && 'error' !== status && !error && <Text color="green.600">{t.newsletterSubscribe.success}</Text>}
                </Stack>
                <Stack direction={{ base: 'row', md: 'row' }} align={'center'} w={'full'} paddingBottom={16} spacing={12}>
                    <Button mt={0} onClick={handleFormSubmit} rightIcon={<HiOutlineArrowNarrowRight />}>
                        {t.newsletterSubscribe.submit}
                    </Button>
                    <Popover placement="bottom-start">
                        <PopoverTrigger>
                            <WarningIcon w={8} h={8} />
                        </PopoverTrigger>
                        <PopoverContent bg="gray.800" color="gray.100" border={0}>
                            <PopoverArrow bg="gray.800" boxShadow={'1px 1px 1px 0 gray.800'} />
                            <PopoverCloseButton p={4} />
                            <PopoverHeader fontWeight={'bold'}>{t.newsletterSubscribe.pop}</PopoverHeader>
                            <PopoverBody>{t.newsletterSubscribe.popbody}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Stack>
            </Container>
        </Flex>
    );
};

export default NewsletterForm;
