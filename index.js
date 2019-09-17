const ESCPOSLabelPrinter = require('./dist/brother-ql-810w').default

let instance = new ESCPOSLabelPrinter()

instance.initialize()
instance.setLandscape(false)
instance.setBold()
instance.setAlignment(ESCPOSLabelPrinter.Alignment.CENTER)
instance.setFont(ESCPOSLabelPrinter.Font.LetterGothic)
instance.setSize(100)
instance.addText("Hello World")
instance.code39("HIVE-846497445")
instance.print()


console.log(instance.encode())
