export default class ESCPOSLabelPrinter {
  buffer: Array<number> = []
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
    this.buffer.push(0x1B, 0x69, 0x4c, landscape)
    return this
  }

  clearLandscape(): ESCPOSLabelPrinter {
    this.setLandscape(false)
    return this
  }

  initialize(): ESCPOSLabelPrinter {
    this.buffer.push(...[0x1b, 0x40])
    return this
  }
}
