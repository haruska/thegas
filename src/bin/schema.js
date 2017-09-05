#!/usr/bin/env babel-node
import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'

const pwd = process.cwd()
const schemaFile = `${path.join(pwd, 'app', 'graph', 'schema')}`
const Schema = require(schemaFile).default

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(Schema, introspectionQuery).then(result => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2),
    )
  } else {
    console.log('Writing JSON format schema...')
    fs.writeFileSync(
      path.join(pwd, 'schema.json'),
      JSON.stringify(result, null, 2),
    )
  }
})

// Save user readable type system shorthand of schema
console.log('Writing GraphQLS format schema...')
fs.writeFileSync(
  path.join(pwd, 'schema.graphqls'),
  printSchema(Schema)
)
