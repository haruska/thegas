import shell from 'shelljs'
import path from 'path'
import build from './build'
import fs from 'fs'

export const PRODUCTION = 'production'
export const STAGING = 'staging'

function writeServerlessYaml(buildDir) {
  const fileName = path.join(buildDir, 'serverless.yaml')

  const doc = `
service: wiki-graph

provider:
  name: aws
  runtime: nodejs6.10
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "lambda:InvokeFunction"
      Resource: "*"

functions:
  api:
    handler: lambda.handler
    events:
      - http:
          path: '{proxy+}'
          method: any
          cors: true
`

  fs.writeFileSync(fileName, doc)
}

function writeLambdaHandler(buildDir) {
  const fileName = path.join(buildDir, 'lambda.js')

  const doc = `
'use strict';

var awsServerlessExpress = require('aws-serverless-express');
var app = require('./index');
var server = awsServerlessExpress.createServer(app);

exports.handler = function (event, context) {
  return awsServerlessExpress.proxy(server, event, context);
};
`

  fs.writeFileSync(fileName, doc)
}

export default function(environment) {
  const stage = environment || STAGING
  const cwd = `${process.cwd()}`
  const buildDir = build()
  const serverlessExec = path.join(cwd, 'node_modules', '.bin', 'serverless')

  writeServerlessYaml(buildDir)
  writeLambdaHandler(buildDir)

  shell.cd(buildDir)
  shell.exec(`${serverlessExec} --stage=${stage} deploy`)
  shell.cd(cwd)

  return true
}
