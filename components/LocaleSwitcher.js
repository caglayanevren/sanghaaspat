import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LocaleSwitcher() {
    const router = useRouter();
    const { locales, locale: activeLocale } = router;
    const otherLocales = locales.filter((locale) => locale !== activeLocale);

    const { pathname } = router;
    //{console.log('p: ', pathname);}
    //{console.log('q: ', query);}
    //{console.log('as: ', asPath);}
    const pathTranslations = {
        tr: {
            '/': '/',
            '/about-sangha': '/sangha-hakkinda',
            '/qigong-classes': '/qigong-dersleri',
            '/qimassage': '/qimasaj',
            '/events': '/etkinlikler',
            '/reviews': '/yorumlar',
            '/contact': '/iletisim',
        },
        en: {
            '/': '/',
            '/about-sangha': '/about-sangha',
            '/qigong-classes': '/qigong-classes',
            '/qimassage': '/qimassage',
            '/events': '/events',
            '/reviews': '/reviews',
            '/contact': '/contact',
        },
    }
    const translatedPath = pathTranslations[otherLocales]?.[pathname] 
    const as = translatedPath && activeLocale === 'en' ? `/${otherLocales}${translatedPath}` : translatedPath && activeLocale === 'tr' ? `${translatedPath}` : undefined
    //{console.log('tran: ', translatedPath);}

    return (
        <div>
            <ul>
                {otherLocales.map((locale) => {
                    return (
                        <li key={locale} style={{ listStyle: 'none' }}>
                            <Link
                                href={translatedPath}
                                as={as}
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
