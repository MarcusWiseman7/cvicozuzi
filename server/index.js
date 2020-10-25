const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();

const users = require('../api/users');
const auth = require('../api/auth');
const content = require('../api/content');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start () {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const { host, port } = nuxt.options.server;

    await nuxt.ready();
    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    // App middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use('/users', users);
    app.use('/auth', auth);
    app.use('/content', content);

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true,
    });
}

start();
