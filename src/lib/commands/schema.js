import shell from 'shelljs'

export default function(options) {
  shell.echo('Updating GraphQL Schema...')
  shell.exec('thegas-schema')
  shell.echo('Done.')
  shell.exit(0)
}