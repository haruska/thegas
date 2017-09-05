import shell from 'shelljs'
import deployFunc from '../deploy'

export default function() {
  deployFunc()
  shell.exit(0)
}
