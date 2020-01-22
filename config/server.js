const { getArgv } = require('./utils')

module.exports = {
    ip: getArgv('ip') || '',
    prefix: getArgv('pre') || ''
}
