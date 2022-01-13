module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'tr'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    trailingSlash: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/tr/sangha-hakkinda',
                destination: '/tr/about-sangha',
                locale: false,
            },
            {
                source: '/tr/qigong-dersleri',
                destination: '/tr/qigong-classes',
                locale: false,
            },
            {
                source: '/tr/qimasaj',
                destination: '/tr/qimassage',
                locale: false,
            },
            {
                source: '/tr/etkinlikler',
                destination: '/tr/events',
                locale: false,
            },
            {
                source: '/tr/yorumlar',
                destination: '/tr/reviews',
                locale: false,
            },
            {
                source: '/tr/iletisim',
                destination: '/tr/contact',
                locale: false,
            },
        ];
    },
    env: {
        NEXT_PUBLIC_GOOGLEMAP_API_KEY:
            'AIzaSyCxPye5uM863Q_MphOEu4ie1xFJvaogGrI',
        siteTitle: 'Sangha Aspat',
        home: {
            english: {
                title: 'Home',
                desc: 'Home description',
                path: '/',
                notionPageId: '366afccc9ec74e3cae9f89af70b33459',
            },
            turkish: {
                title: 'Anasayfa',
                desc: 'Anasayfa açıklama',
                path: '/tr/',
                notionPageId: 'b3a0c0fede8d457499a7da71a0e010db',
            },
        },
        aboutSangha: {
            english: {
                title: 'About Sangha',
                desc: 'About Sangha description',
                path: '/about-sangha',
                notionPageId: '77c9eaae32e24958aaf3650265dac47a',
                firstCVId: '91e924e8-28e2-4a77-871f-2fb46723d2d4',
                secondCVId: '294f2599-87da-4fb7-a204-70c5a8a41d41',
            },
            turkish: {
                title: 'Sangha Hakkında',
                desc: 'Sangha Hakkında açıklama',
                path: '/sangha-hakkinda',
                notionPageId: '2a209e6b6d5d4400954c5e8512ba8b56',
                firstCVId: 'bc132381-cd85-43fb-988d-4b24ba698807',
                secondCVId: 'db06f5d1-d563-4676-bbb1-5937e9c3a740',
            },
        },
        qigongClasses: {
            english: {
                title: 'Qi Gong Classes',
                desc: 'Qi Gong Classes description',
                path: '/qigong-classes',
                notionPageId: 'b61625199c4b4663bea5760f7ef4bf95',
            },
            turkish: {
                title: 'Qi Gong Dersleri',
                desc: 'Qi Gong Dersleri açıklama',
                path: '/qigong-dersleri',
                notionPageId: 'f04458ef38c541efb0082eb3c44e7c62',
            },
        },
        qimassage: {
            english: {
                title: 'Qi Massage',
                desc: 'Qi Massage description',
                path: '/qimassage',
                notionPageId: '',
            },
            turkish: {
                title: 'Qi Masaj',
                desc: 'Qi Masaj açıklama',
                path: '/qimasaj',
                notionPageId: '',
            },
        },
        events: {
            english: {
                title: 'Events',
                desc: 'Events description',
                path: '/events',
                notionPageId: '',
            },
            turkish: {
                title: 'Etkinlikler',
                desc: 'Etkinlikler açıklama',
                path: '/etkinlikler',
                notionPageId: '',
            },
        },
        reviews: {
            english: {
                title: 'Reviews',
                desc: 'Reviews description',
                path: '/reviews',
                notionPageId: '',
            },
            turkish: {
                title: 'Yorumlar',
                desc: 'Yorumlar açıklama',
                path: '/yorumlar',
                notionPageId: '',
            },
        },
        contact: {
            english: {
                title: 'Contact',
                desc: 'Contact description',
                path: '/contact',
                notionPageId: '',
            },
            turkish: {
                title: 'İletişim',
                desc: 'İletişim açıklama',
                path: '/iletisim',
                notionPageId: '',
            },
        },
    },
};
