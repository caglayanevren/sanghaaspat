import { Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function MenuItem({
    isLast,
    to = '/',
    toTr = to,
    textEn,
    textTr,
    ...rest
}) {
    const router = useRouter();
    const { locale } = router;

    return (
        <Link
            href={
                locale === 'en'
                    ? to
                    : locale === 'tr'
                    ? `/tr${toTr}`
                    : 'lang error'
            }
            {...rest}
        >
            {locale === 'en' ? textEn : locale === 'tr' ? textTr : 'lang error'}
        </Link>
    );
}
