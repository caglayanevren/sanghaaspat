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
    const pathTranslations = process.env.pathTranslations;

    const translatedPath = pathTranslations[otherLocales]?.[pathname];
    const as = translatedPath && activeLocale === 'en' ? `/${otherLocales}${translatedPath}` : translatedPath && activeLocale === 'tr' ? `${translatedPath}` : undefined;
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
                                style={{
                                    textTransform: 'uppercase',
                                    color: ' #fff',
                                    fontWeight: 'medium',
                                }}
                            >
                                {locale}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
