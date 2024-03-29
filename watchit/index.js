const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');
const chalk = require('chalk');

program
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(async ({ filename }) => {
        const name = filename || 'index.js';
        try {
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(`Could not find the file ${name}`);
        }
        let child_process;
        const start = debounce(() => {
            if (child_process) {
                console.log(chalk.blue('Restarting the process...'));
                child_process.kill();
            }
            child_process = spawn('node', [name], { stdio: 'inherit' });
        }, 100);

        chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    });

program.parse(process.argv);