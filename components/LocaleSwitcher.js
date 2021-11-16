import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LocaleSwitcher() {
    const router = useRouter();
    const { locales, locale: activeLocale } = router;
    const otherLocales = locales.filter((locale) => locale !== activeLocale);

    return (
        <div>
            <ul>
                {otherLocales.map((locale) => {
                    const { pathname, query, asPath } = router;
                    return (
                        <li key={locale} style={{ listStyle: 'none' }}>
                            <Link
                                href={{ pathname, query }}
                                as={asPath}
                                locale={locale}
                            >
                                <a
                                    style={{
                                        textTransform: 'uppercase',
                                        color: ' #fff',
                                        fontWeight: 'medium',
                                    }}
                                >
                                    {locale}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
