import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

export default (graphql, schema) => {
  const graphQLHandler = (query, variables) => graphql(schema, query, null, {}, variables)
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use((req, res, next) => {
    console.log('Request:')
    console.log(new Date(), req.method, req.url, req.body)
    next()
  })

  app.post('/graphql', (req, res) => {
    graphQLHandler(req.body.query, req.body.variables)
      .then(result => {
        console.log('Response:')
        console.log(result)
        return res.json(result)
      }, err => {
        console.log(err)
      })
      .catch(err => {
        res.end(err)
      })
  })

  return app
}

