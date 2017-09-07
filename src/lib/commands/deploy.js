import shell from 'shelljs'
import deployFunc, { PRODUCTION, STAGING } from '../deploy'

export default function(options) {
  const stage = options && options.production ? PRODUCTION : STAGING
  deployFunc(stage)
  shell.exit(0)
}
