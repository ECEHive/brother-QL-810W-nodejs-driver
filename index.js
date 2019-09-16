const ESCPOSLabelPrinter = require('./dist/brother-ql-810w').default

let instance = new ESCPOSLabelPrinter()

instance.initialize()

console.log(instance)
