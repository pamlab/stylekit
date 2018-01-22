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

const pathOptim = data => data.replace(/\/$/, '');
const inputDir = args.options.input ? pathOptim(args.options.input) : 'src/css';
const outputDir = args.options.output ? pathOptim(args.options.output) : 'css';
const watcher = chokidar.watch(`${inputDir}/**.css`);

watcher.on('ready', () => {
    console.warn(chalk.bold.cyan('Waiting for file changes...'));
});

watcher.on('change', (path, stats) => {
    const file = path.split('\\');
    build(file[file.length - 1]);
    console.warn(chalk.bold.cyan('Waiting for file changes...'));
});

function build(file) {
    const input = `${inputDir}/${file}`;
    const output = `${outputDir}/${file}`;

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
    .process(fs.readFileSync(input), {
        from: input,
        to: output
    })
    .then(result => {
        if (result.warnings().length) {
            console.warn(reporter(result));
        }
        fs.writeFile(output, result.css, err => {
            if (err) throw err;
        });
    })
    .catch(err => {
        err.message = err.message.substr(err.file.length + 1);
        err.message = err.message.replace(/:\s/, '] ');
        console.error('\n', chalk.bold.red(`[${err.message}`));
        console.error('\n', err.showSourceCode(), '\n\n');
    });
}