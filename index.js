#!/usr/bin/env node
'use strict';

const bootstrap = require('./app.js');
const params = process.argv.slice(2);

bootstrap(params);