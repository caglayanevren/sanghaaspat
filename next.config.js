module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'tr'],
        defaultLocale: 'en',
    },
    trailingSlash: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
