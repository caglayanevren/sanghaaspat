module.exports = {
    swcMinify: true,
    reactStrictMode: false,
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
        NEXT_PUBLIC_GOOGLE_ANALYTICS: 'G-D4C9JXL36Z',
        NEXT_PUBLIC_GOOGLEMAP_API_KEY:
            'AIzaSyCxPye5uM863Q_MphOEu4ie1xFJvaogGrI',
        siteTitle: 'Sangha Aspat',
        home: {
            english: {
                title: 'Home',
                desc: 'healing and meditation center',
                path: '/',
                notionPageId: '366afccc9ec74e3cae9f89af70b33459',
            },
            turkish: {
                title: 'Anasayfa',
                desc: 'şifa ve meditasyon merkezi',
                path: '/tr/',
                notionPageId: 'b3a0c0fede8d457499a7da71a0e010db',
            },
        },
        aboutSangha: {
            english: {
                title: 'About Sangha',
                desc: 'Sangha in Sanskrit means "to gather". A community of people, gathering for a higher purpose.',
                path: '/about-sangha',
                notionPageId: '77c9eaae32e24958aaf3650265dac47a',
                firstCVId: '91e924e8-28e2-4a77-871f-2fb46723d2d4',
                secondCVId: '294f2599-87da-4fb7-a204-70c5a8a41d41',
            },
            turkish: {
                title: 'Sangha Hakkında',
                desc: 'Sangha, Sanskritçe\'de "toplanmak" anlamına gelir. Daha yüksek bir amaç için bir araya gelen insan topluluğu.',
                path: '/sangha-hakkinda',
                notionPageId: '2a209e6b6d5d4400954c5e8512ba8b56',
                firstCVId: 'bc132381-cd85-43fb-988d-4b24ba698807',
                secondCVId: 'db06f5d1-d563-4676-bbb1-5937e9c3a740',
            },
        },
        qigongClasses: {
            english: {
                title: 'Qi Gong Classes',
                desc: 'Classes, programs and more...',
                path: '/qigong-classes',
                notionPageId: 'b61625199c4b4663bea5760f7ef4bf95',
            },
            turkish: {
                title: 'Qi Gong Dersleri',
                desc: 'Sınıflar, ders saatleri ve dahası...',
                path: '/qigong-dersleri',
                notionPageId: 'f04458ef38c541efb0082eb3c44e7c62',
            },
        },
        qimassage: {
            english: {
                title: 'Qi Massage',
                desc: 'Qi massage is a healing system based on the philosophy of Chinese Medicine and Qi Gong practice.',
                path: '/qimassage',
                notionPageId: '955cd0b1b6ba45178a3a8e915b047e71',
            },
            turkish: {
                title: 'Qi Masaj',
                desc: 'Qi Masaj, temelini Geleneksel Çin Tıbbı ve Qi Gong pratiğinden alan bir iyileşme sistemidir.',
                path: '/qimasaj',
                notionPageId: '85fdbf63ddc844c3a4df86f05c7ce312',
            },
        },
        events: {
            english: {
                title: 'Events',
                desc: 'Our other events coming soon on this page! Stay tuned',
                path: '/events',
                notionPageId: '',
            },
            turkish: {
                title: 'Etkinlikler',
                desc: 'Çok yakında diğer etkinliklerimiz bu sayfada! Takipte kalın',
                path: '/etkinlikler',
                notionPageId: '',
            },
        },
        reviews: {
            english: {
                title: 'Reviews',
                desc: 'Sangha lovers said:',
                path: '/reviews',
                notionPageId: '',
            },
            turkish: {
                title: 'Yorumlar',
                desc: "Sangha'yı sevenler şunları söylediler:",
                path: '/yorumlar',
                notionPageId: '',
            },
        },
        contact: {
            english: {
                title: 'Contact',
                desc: 'Ask your questions about Sangha...',
                path: '/contact',
                notionPageId: '',
            },
            turkish: {
                title: 'İletişim',
                desc: 'Sangha ile ilgili merak ettiklerinizi sorun...',
                path: '/iletisim',
                notionPageId: '',
            },
        },
    },
};
