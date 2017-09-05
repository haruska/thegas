import shell from 'shelljs'

export default function(options) {
  shell.echo('Starting Thegas server...')
  shell.exec('thegas-server')
  shell.echo('Done.')
  shell.exit(0)
}
