#!/usr/bin/env node
import minimist from 'minimist'
import shell from 'shelljs'
import path from 'path'
import commands from '../lib/commands'

const main = () => {
  const args = minimist(process.argv.slice(2), {
    alias: { h: 'help', v: 'version', p: 'production' },
    string: ['source'],
    boolean: ['production'],
    default: { 'source': shell.pwd().toString() }
  })

  const command = args._ && args._.length && args._[0]

  if (args.version && !command) {
    console.log(require(path.join(__dirname, '..', '..', 'package.json')).version)
    return
  }

  if (command && !commands[command]) {
    console.error(`unsupported command ${command}. re-run with --help for usage information`)
    process.exit(1)
    return
  }

  if (args.help) {
    const doc = `
usage: thegas [command] {OPTIONS}

Deploy a GraphQL endpoint to AWS as a lambda microservice.

COMMANDS are:
  schema        regenerates schema definition
  server        runs a local server graph endpoint
  build         builds project to a temp directory
  deploy  [-p]  deploys to aws and returns an endpoint
                  -p : production (default staging)

OPTIONS are:

  --help        print this help screen
  --version     print out the current version

`
    console.log(doc)
    process.exit(0)
    return
  }

  if (!command) {
    console.error('command not provided. re-run with --help for usage information')
    process.exit(1)
    return
  }

  commands[command](args)
  process.exit()
}

main()
