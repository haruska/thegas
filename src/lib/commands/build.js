import shell from 'shelljs'
import buildFunc from '../build'

export default function() {
  const buildDir = buildFunc({keep: true})
  console.log(`Build Dir: ${buildDir}`)
  shell.exit(0)
}
