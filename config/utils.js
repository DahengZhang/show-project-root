const getArgv = (key) => {
    const booleanTmp = process.argv.find(item => {
        return new RegExp(`--${key}(?<!=)$`).test(item)
    })
    const valueTmp = process.argv.find(item => {
        return new RegExp(`--${key}=`).test(item)
    })

    if (booleanTmp) {
        return true
    } else if (valueTmp) {
        return valueTmp.match(new RegExp(`--${key}=([^ ]+)`)) && valueTmp.match(new RegExp(`--${key}=([^ ]+)`))[1] || ''
    } else {
        return false
    }
}

module.exports = { getArgv }
