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
    /* async rewrites() {
        return [
            {
                source: '/tr/siniflar',
                destination: '/tr/classes',
                locale: false,
            },
        ];
    }, */
    /* async redirects() {
        return [
            {
                source: '/tr/siniflar',
                destination: '/tr/classes',
                permanent: true,
            },
        ];
    }, */
};
