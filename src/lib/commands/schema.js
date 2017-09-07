import shell from 'shelljs'

export default function() {
  shell.echo('Updating GraphQL Schema...')
  shell.exec('thegas-schema')
  shell.echo('Done.')
  shell.exit(0)
}