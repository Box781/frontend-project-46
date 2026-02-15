#!/usr/bin/env node

import { Command } from 'commander'
import parseFile from './src/parser.js'
import diff from './src/diff.js'

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2, options)=>{
    const data1 = parseFile(filepath1) 
    const data2 = parseFile(filepath2)
    const dif = diff(data1, data2)
    console.log(dif)
  });
program.parse();