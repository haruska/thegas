import shell from 'shelljs'
import tmp from 'tmp'

export default function(options) {
  const cwd = `${process.cwd()}`

  const buildDirObj = tmp.dirSync(options)
  const buildDir = buildDirObj.name

  //copy
  shell.cp('package.json', 'yarn.lock', buildDir)

  //install
  shell.cd(buildDir)
  shell.exec('yarn install --prod')
  shell.cd(cwd)

  //compile
  shell.exec(`babel app --out-dir ${buildDir} --copyFiles --ignore __tests__`)

  return buildDir
}
