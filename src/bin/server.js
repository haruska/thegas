#!/usr/bin/env babel-watch
import path from 'path'

const pwd = process.cwd()
const appFile = `${path.join(pwd, 'app')}`
const app = require(appFile)

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');