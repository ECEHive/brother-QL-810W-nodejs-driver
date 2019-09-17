const ESCAPE = 0x1b

export default class ESCPOSLabelPrinter {
  buffer: Array<number> = []
  static Alignment = {
    LEFT: 0,
    CENTER: 1,
    RIGHT: 2,
    NONE: 3,
  }

  static Font = {
    Brougham: 0,
    LetterGothicBold: 1,
    Brussels: 2,
    Helsinki: 3,
    SanDiego: 4,
    LetterGothic: 9,
  }

  constructor() {
    this.clear()
  }

  clear() {
    this.buffer = new Array<number>()
  }

  setESCPMode(): ESCPOSLabelPrinter {
    this.buffer.push(...[0x1b, 0x69, 0x61, 0x00])
    return this
  }

  // Using this command clears the text in "printer buffer"
  setLandscape(enable: boolean = true): ESCPOSLabelPrinter {
    const landscape = enable ? 0x1 : 0x0
    this.buffer.push(ESCAPE, 0x69, 0x4c, landscape)
    return this
  }

  clearLandscape(): ESCPOSLabelPrinter {
    this.setLandscape(false)
    return this
  }

  setAlignment(alignMode: number = ESCPOSLabelPrinter.Alignment.LEFT) {
    this.buffer.push(ESCAPE, 0x61, alignMode)
  }

  setFont(font: number = ESCPOSLabelPrinter.Font.LetterGothic) {
    this.buffer.push(ESCAPE, 0x6B, font)
  }

  setBold() {
    this.buffer.push(ESCAPE, 0x45)
  }

  setSize(fontSize: number) {
    const sizeLo = fontSize & 0xFF
    const sizeHi = (fontSize >> 2) & 0xFF
    this.buffer.push(ESCAPE, 0x58, 0, sizeLo, sizeHi)
  }

  print() {
    this.buffer.push(0x0C)// FF Page Feed
  }

  setCutAfterPrint() {
    this.buffer.push(ESCAPE, 0x69, 0x43, 1)
  }

  clearCutAfterPrint() {
    this.buffer.push(ESCAPE, 0x69, 0x43, 0)
  }

  clearBold() {
    this.buffer.push(ESCAPE, 0x46)
  }

  addText(text: string) {
    this.buffer.push(
      ...text.split('').map((chr: string) => {
        return chr.charCodeAt(0)
      })
    )
  }

  code39(text: string) {
    text = text.replace('\\', '')
    this.buffer.push(ESCAPE, 0x69)
    this.addText('t0r1h')
    this.buffer.push(0,100)
    this.addText('w1')
    this.addText(text)
    this.addText('?\\')
  }

  encode(): Uint8Array {
    const rtnVal = new Uint8Array(this.buffer.length)
    this.buffer.forEach((val, idx) => {
      rtnVal[idx] = val
    })
    return rtnVal
  }

  initialize(): ESCPOSLabelPrinter {
    this.buffer.push(...[0x1b, 0x40])
    return this
  }
}
