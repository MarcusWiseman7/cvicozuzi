module.exports = {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Cvicozuzi',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Zuzana Doudova fitness website' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@/assets/scss/main.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ['@/plugins/v-scroll-lock'],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    telemetry: true,

    server: {
        port: 3060,
    },

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [['@nuxtjs/google-analytics', { id: 'UA-154926536-1' }]],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        'nuxt-compress',
        'nuxt-helmet',
        ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
        '@nuxtjs/auth',
        '@nuxtjs/style-resources',
        '@nuxtjs/sitemap', // Always last
    ],

    styleResources: {
        scss: './assets/scss/_variables.scss',
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        proxy: true,
    },

    proxy: {
        '/api/': { target: 'https://api.cvicozuzi.com', pathRewrite: { '^/api/': '' } },
    },

    'nuxt-compress': {
        gzip: {
            cache: true,
        },
        brotli: {
            threshold: 10240,
        },
    },
    auth: {
        redirect: {
            login: '/secure',
            logout: '/',
            callback: '/',
            home: '/',
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/auth/login', method: 'post', propertyName: 'token' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/auth/user', method: 'get', propertyName: 'user' },
                },
            },
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: ['v-body-scroll-lock'],
    },
};
