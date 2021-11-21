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
        siteTitle: 'Sangha Aspat',
        home: {
            en: {
                title: 'Home',
                desc: 'Home description',
                path: '/',
                notionPageId: '366afccc9ec74e3cae9f89af70b33459',
            },
            tr: {
                title: 'Anasayfa',
                desc: 'Anasayfa açıklama',
                path: '/tr/',
                notionPageId: 'b3a0c0fede8d457499a7da71a0e010db',
            },
        },
        aboutSangha: {
            en: {
                title: 'About Sangha',
                desc: 'About Sangha description',
                path: '/about-sangha',
                notionPageId: '77c9eaae32e24958aaf3650265dac47a',
            },
            tr: {
                title: 'Sangha Hakkında',
                desc: 'Sangha Hakkında açıklama',
                path: '/sangha-hakkinda',
                notionPageId: '2a209e6b6d5d4400954c5e8512ba8b56',
            },
        },
        qigongClasses: {
            en: {
                title: 'Qi Gong Classes',
                desc: 'Qi Gong Classes description',
                path: '/qigong-classes',
                notionPageId: '',
            },
            tr: {
                title: 'Qi Gong Dersleri',
                desc: 'Qi Gong Dersleri açıklama',
                path: '/qigong-dersleri',
                notionPageId: '',
            },
        },
        qimassage: {
            en: {
                title: 'Qi Massage',
                desc: 'Qi Massage description',
                path: '/qimassage',
                notionPageId: '',
            },
            tr: {
                title: 'Qi Masaj',
                desc: 'Qi Masaj açıklama',
                path: '/qimasaj',
                notionPageId: '',
            },
        },
        events: {
            en: {
                title: 'Events',
                desc: 'Events description',
                path: '/events',
                notionPageId: '',
            },
            tr: {
                title: 'Etkinlikler',
                desc: 'Etkinlikler açıklama',
                path: '/etkinlikler',
                notionPageId: '',
            },
        },
        reviews: {
            en: {
                title: 'Reviews',
                desc: 'Reviews description',
                path: '/reviews',
                notionPageId: '',
            },
            tr: {
                title: 'Yorumlar',
                desc: 'Yorumlar açıklama',
                path: '/yorumlar',
                notionPageId: '',
            },
        },
        contact: {
            en: {
                title: 'Contact',
                desc: 'Contact description',
                path: '/contact',
                notionPageId: '',
            },
            tr: {
                title: 'İletişim',
                desc: 'İletişim açıklama',
                path: '/iletisim',
                notionPageId: '',
            },
        },
    },
};
