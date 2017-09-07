#!/usr/bin/env node
import minimist from 'minimist'
import shell from 'shelljs'
import path from 'path'
import commands from '../lib/commands'

const main = () => {
  const args = minimist(process.argv.slice(2), {
    alias: { h: 'help', v: 'version' },
    string: ['source', 'name', 'region', 'profile'],
    boolean: ['quiet'],
    default: { 'source': shell.pwd().toString() }
  })

  const command = args._ && args._.length && args._[0]

  if (args.version && !command) {
    console.log(require(path.join(__dirname, '..', 'package.json')).version)
    return
  }

  if (command && !commands[command]) {
    console.error(`unsupported command ${command}. re-run with --help for usage information`)
    process.exit(1)
    return
  }

  // if (args.help) {
  //   if (command) {
  //     console.log(docTxt.commandDoc(commands[command]));
  //   } else {
  //     console.log(docTxt.index(commands));
  //   }
  //   return;
  // }

  if (!command) {
    console.error('command not provided. re-run with --help for usage information')
    process.exit(1)
    return
  }

  commands[command](args)
  process.exit()
}

main()
