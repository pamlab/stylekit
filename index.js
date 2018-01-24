'use strict';

const fs = require('fs');
const postcss = require('postcss');
const reporter = require('postcss-reporter/lib/formatter')();
const chalk = require('chalk');
const chokidar = require('chokidar');
const argv = require('argv');
const config = require('./config.json');

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
    },
    {
        name: 'target',
        short: 't',
        type: 'string'
    }
]).run();

const pathOptim = data => data.replace(/\/$/, '');
const inputDir = args.options.input ? pathOptim(args.options.input) : 'src/css';
const outputDir = args.options.output ? pathOptim(args.options.output) : 'css';
const watcher = chokidar.watch(`${inputDir}/**.css`);

watcher.on('ready', () => {
    const target = args.options.target ? args.options.target : 'default';

    console.warn(chalk.bold.green(`Started in ${target} mode.`));
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

    let browsers;

    switch (args.options.target) {
        case "pc" :
            browsers = config.autoprefixer.browsers.pc;
            break;

        case "sp" :
            browsers = config.autoprefixer.browsers.sp;
            break;

        default :
            browsers = config.autoprefixer.browsers.default;
            break;
    }

    postcss([
        require('postcss-flexbugs-fixes')(),
        require('postcss-custom-properties')(),
        require('postcss-nesting')(),
        require('postcss-custom-media')(),
        require('postcss-pseudo-class-any-link')(),
        require('postcss-apply')(),
        require('postcss-color-function')(),
        require('autoprefixer')({
            "browsers": browsers
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