const ESCPOSLabelPrinter = require('./dist/brother-ql-810w').default
const fs = require('fs')

let instance = new ESCPOSLabelPrinter()

instance.setESCPMode()
instance.initialize()
instance.setLandscape(true)
instance.setLength(528)
instance.setHorizontalPosition(150)
instance.setVerticalPosition(270)
instance.setFont(ESCPOSLabelPrinter.Font.HelsinkiP)
instance.setSize(50)
// instance.setLandscape(false)
// instance.setBold()
// instance.setAlignment(ESCPOSLabelPrinter.Alignment.CENTER)
instance.addText("At your side")
// instance.code39("HIVE-846497445")
instance.print()

console.log(instance.encode())

fs.appendFileSync('output', new Buffer(instance.encode()))
