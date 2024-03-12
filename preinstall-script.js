/**
 * Do NOT allow using `npm` as package manager.
 */
if (!process.env.npm_execpath.includes('yarn')) {
  console.error('You must use Yarn to install dependencies:')
  console.error('  $ yarn install')
  process.exit(1)
}
