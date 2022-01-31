import { Box, Stack, Link, Icon, Container } from '@chakra-ui/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { SunIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
//import ChangeColorMode from './ChangeColorMode';
import MenuItem from './MenuItem';
import LocaleSwitcher from '../LocaleSwitcher';

export default function MenuLinks({ isOpen }) {
    const router = useRouter();
    const { locale, locales, defaultLocale } = router;
    return (
        <Box
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}
        >
            <Stack
                spacing={[8, 8, 7, 10]}
                align="center"
                justify={['center', 'space-between', 'flex-end', 'flex-end']}
                direction={['column', 'column', 'row', 'row']}
                pt={[4, 4, 0, 0]}
            >
                <Link
                    href={
                        locale === 'en'
                            ? '/'
                            : locale === 'tr'
                            ? '/tr/'
                            : 'lang error'
                    }
                >
                    <SunIcon />
                </Link>
                <MenuItem
                    to="/about-sangha"
                    toTr="/sangha-hakkinda"
                    textEn={
                        <div
                            style={{ lineHeight: '1.25', textAlign: 'center' }}
                        >
                            About
                            <br />
                            Sangha
                        </div>
                    }
                    textTr={
                        <div
                            style={{ lineHeight: '1.25', textAlign: 'center' }}
                        >
                            Sangha
                            <br />
                            Hakkında
                        </div>
                    }
                />
                <MenuItem
                    to="/qigong-classes"
                    toTr="/qigong-dersleri"
                    textEn={
                        <div
                            style={{ lineHeight: '1.25', textAlign: 'center' }}
                        >
                            Qi&nbsp;Gong
                            <br />
                            Classes
                        </div>
                    }
                    textTr={
                        <div
                            style={{ lineHeight: '1.25', textAlign: 'center' }}
                        >
                            Qi&nbsp;Gong
                            <br />
                            Dersleri
                        </div>
                    }
                />
                <MenuItem
                    to="/qimassage"
                    toTr="/qimasaj"
                    textEn="Qi&nbsp;Massage"
                    textTr="Qi&nbsp;Masaj"
                />
                <MenuItem
                    to="/events"
                    toTr="/etkinlikler"
                    textEn="Events"
                    textTr="Etkinlikler"
                />
                <MenuItem
                    to="/reviews"
                    toTr="/yorumlar"
                    textEn="Reviews"
                    textTr="Yorumlar"
                />
                <MenuItem
                    to="/contact"
                    toTr="/iletisim"
                    textEn="Contact"
                    textTr="İletişim"
                />
                {/* <ChangeColorMode /> */}
                <Stack direction={'row'}>
                    <Link
                        href="https://www.facebook.com/bodrumqigong"
                        isExternal
                    >
                        <Icon as={FaFacebook} />
                    </Link>
                    <Link
                        href="https://www.instagram.com/sanghaaspat/"
                        isExternal
                    >
                        <Icon as={FaInstagram} />
                    </Link>
                </Stack>
                <LocaleSwitcher />
            </Stack>
        </Box>
    );
}
