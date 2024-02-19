#!/usr/bin/env node
import { readdir, lstat as _lstat } from 'fs';
import chalk from 'chalk';
import path from 'path';

let [, , folderInput] = process.argv;
folderInput = folderInput ? folderInput : process.cwd();

readdir(folderInput, async (err, files) => {
    if (err) {
        throw new Error(err);
    }
    const lstatPromises = files.map((filename) => {
        return lstat(path.join(folderInput, filename));
    });
    const allStats = await Promise.all(lstatPromises);
    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        console.log(stats.isFile() ? chalk.green(files[index]) : chalk.red(files[index]));
    }
});

const lstat = (filename) => {
    return new Promise((resolve, reject) => {
        _lstat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}