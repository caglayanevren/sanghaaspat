module.exports = {
    experimental: {
        appDir: true,
    },
    swcMinify: false,
    reactStrictMode: false,
    i18n: {
        locales: ['en', 'tr'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.notion.so',
            },
            {
                protocol: 'https',
                hostname: 's3-us-west-2.amazonaws.com',
            },
        ],
    },
    trailingSlash: true,
    webpack: (config, { webpack }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config.plugins.push(
                new webpack.ContextReplacementPlugin(/\/keyv\//, (data) => {
                    delete data.dependencies[0].critical;
                    return data;
                })
            );

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
                source: '/tr/etkinlikler/:slug',
                destination: '/tr/events/:slug',
                locale: false,
            },
            {
                source: '/tr/inziva',
                destination: '/tr/retreats',
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
        NEXT_PUBLIC_GOOGLEMAP_API_KEY: 'AIzaSyBV6p2zItmGXOYH_4JU85dv6kPj9pzQQ_g',
        NEXT_PUBLIC_MAILCHIMP_URL: 'https://sanghaaspat.us12.list-manage.com/subscribe/post?u=e92bb1d5dd4d92d7e34dfc38a&amp;id=3972369859&amp;f_id=004abee0f0',
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
            galleryId: 'cf9c6e8c460f4e10bc35128e50574c98',
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
            galleryId: '6c93f7143b45497986630db0c2b36540',
        },
        events: {
            english: {
                title: 'Events',
                desc: 'Our other events coming soon on this page! Stay tuned',
                path: '/events',
                notionPageId: '35e8ef3ac3104598b1e33b0c7c4db9b3',
                workshops: {
                    title: 'Workshops',
                    desc: '',
                    path: '/events/workshops',
                    notionPageId: '06d3d26838384168a06f3ea237280795',
                },
                balance: {
                    title: 'Balance',
                    desc: '',
                    path: '/events/balance',
                    notionPageId: '8a63ef73161b41d69832d1fbb3f10967',
                },
                kids: {
                    title: 'Qi Gong for Kids',
                    desc: '',
                    path: '/events/for-kids',
                    notionPageId: '4dce138132be48f091f7ae7a6dade576',
                },
            },
            turkish: {
                title: 'Etkinlikler',
                desc: 'Çok yakında diğer etkinliklerimiz bu sayfada! Takipte kalın',
                path: '/etkinlikler',
                notionPageId: '2429fcb1288e4eed9f90f53723694c2f',
                workshops: {
                    title: 'Workshoplar',
                    desc: '',
                    path: '/etkinlikler/workshoplar',
                    notionPageId: '071b9c3f0c274b19ac28cd8b5d80e84a',
                },
                balance: {
                    title: 'Denge',
                    desc: '',
                    path: '/events/denge',
                    notionPageId: '55ebabc956514c9ab839e41eac98443d',
                },
                kids: {
                    title: 'Çocuklar için Qi Gong',
                    desc: '',
                    path: '/etkinlikler/cocuklar-icin',
                    notionPageId: 'b7a64ebfffcb4d6283d7df8b3385d06f',
                },
            },
        },
        retreats: {
            english: {
                title: 'Retreats',
                desc: '',
                path: '/retreats',
                notionPageId: '28d4779d1c6641ad904be4be19fe51d8',
            },
            turkish: {
                title: 'İnziva',
                desc: '',
                path: '/inziva',
                notionPageId: 'a3924a9f24a9454c8f38348b8cc270a3',
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
        pathTranslations: {
            tr: {
                '/': '/',
                '/about-sangha': '/sangha-hakkinda',
                '/qigong-classes': '/qigong-dersleri',
                '/qimassage': '/qimasaj',
                '/events': '/etkinlikler',
                '/events/workshops': '/etkinlikler/workshoplar',
                '/events/[slug]': '/etkinlikler',
                '/retreats': '/inziva',
                '/reviews': '/yorumlar',
                '/contact': '/iletisim',
            },
            en: {
                '/': '/',
                '/about-sangha': '/about-sangha',
                '/qigong-classes': '/qigong-classes',
                '/qimassage': '/qimassage',
                '/events': '/events',
                '/events/workshops': '/events/workshops',
                '/events/[slug]': '/events',
                '/retreats': '/retreats',
                '/reviews': '/reviews',
                '/contact': '/contact',
            },
        },
    },
};
