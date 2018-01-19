#!/usr/bin/env node
'use strict'

const fs = require('fs');
const postcss = require('postcss');
const reporter = require('postcss-reporter/lib/formatter')();
const chalk = require('chalk');
const chokidar = require('chokidar');
const argv = require('argv');

const args = argv.option([
    {
        name: 'input',
        short: 'i',
        type: 'string'
    },
    {
        name: 'output',
        short: 'o',
        type: 'string'
    }
]).run();

const filename = args.options.input ? args.options.input : 'test.css';
const inputFile = 'src/css/' + filename;
const outputFile = 'css/' + filename;
const watcher = chokidar.watch('./src/css/**.css');

watcher.on('ready', () => {
    build();
    console.warn(chalk.bold.cyan('Waiting for file changes...'));
});

watcher.on('change', path => {
    build();
    console.warn(chalk.bold.cyan('Waiting for file changes...'));
});

function build() {
    postcss([
        require('postcss-flexbugs-fixes')(),
        require('postcss-custom-properties')(),
        require('postcss-nesting')(),
        require('postcss-custom-media')(),
        require('postcss-pseudo-class-any-link')(),
        require('postcss-apply')(),
        require('postcss-color-function')(),
        require('autoprefixer')({
            "browsers": [
                "last 2 versions",
                "ie >= 11",
                "ios >= 6",
                "android >= 4.0"
            ]
        })
    ])
    .process(fs.readFileSync(inputFile), {
        from: inputFile,
        to: outputFile
    })
    .then(result => {
        if (result.warnings().length) {
            console.warn(reporter(result));
        }
        fs.writeFile(outputFile, result.css, err => {
            if (err) throw err;
        });
    });
}