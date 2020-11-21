module.exports = {
    apps : [{
        name: 'cvicozuzi',
        script: './server/index.js',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        env_test: {
            NODE_ENV: 'test'
        }
    }],
};
