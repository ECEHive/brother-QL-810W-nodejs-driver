const ESCPOSLabelPrinter = require('./dist/brother-ql-810w').default
const fs = require('fs')

let instance = new ESCPOSLabelPrinter()

instance.setESCPMode()
instance.initialize()
instance.setLength(200)
instance.setFont(ESCPOSLabelPrinter.Font.LetterGothic)
instance.setBold()
instance.setSize(80)
// instance.setLandscape(false)
// instance.setBold()
instance.setAlignment(ESCPOSLabelPrinter.Alignment.CENTER)
instance.addText("At your side\n")
instance.code39("846497445")
// instance.clearCutAfterPrint()
instance.print()

fs.appendFileSync('/dev/usb/lp0', Buffer.from(instance.encode()))
