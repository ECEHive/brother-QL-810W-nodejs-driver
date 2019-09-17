"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ESCAPE = 0x1b;
var ESCPOSLabelPrinter = /** @class */ (function () {
    function ESCPOSLabelPrinter() {
        this.buffer = [];
        this.clear();
    }
    ESCPOSLabelPrinter.prototype.clear = function () {
        this.buffer = new Array();
    };
    ESCPOSLabelPrinter.prototype.setESCPMode = function () {
        var _a;
        (_a = this.buffer).push.apply(_a, [0x1b, 0x69, 0x61, 0x00]);
        return this;
    };
    // Using this command clears the text in "printer buffer"
    ESCPOSLabelPrinter.prototype.setLandscape = function (enable) {
        if (enable === void 0) { enable = true; }
        var landscape = enable ? 0x1 : 0x0;
        this.buffer.push(ESCAPE, 0x69, 0x4c, landscape);
        return this;
    };
    ESCPOSLabelPrinter.prototype.clearLandscape = function () {
        this.setLandscape(false);
        return this;
    };
    ESCPOSLabelPrinter.prototype.setAlignment = function (alignMode) {
        if (alignMode === void 0) { alignMode = ESCPOSLabelPrinter.Alignment.LEFT; }
        this.buffer.push(ESCAPE, 0x61, alignMode);
    };
    ESCPOSLabelPrinter.prototype.setFont = function (font) {
        if (font === void 0) { font = ESCPOSLabelPrinter.Font.LetterGothic; }
        this.buffer.push(ESCAPE, 0x6B, font);
    };
    ESCPOSLabelPrinter.prototype.setBold = function () {
        this.buffer.push(ESCAPE, 0x45);
    };
    ESCPOSLabelPrinter.prototype.setSize = function (fontSize) {
        var sizeLo = fontSize & 0xFF;
        var sizeHi = (fontSize >> 2) & 0xFF;
        this.buffer.push(ESCAPE, 0x58, 0, sizeLo, sizeHi);
    };
    ESCPOSLabelPrinter.prototype.print = function () {
        this.buffer.push(0x0C); // FF Page Feed
    };
    ESCPOSLabelPrinter.prototype.setCutAfterPrint = function () {
        this.buffer.push(ESCAPE, 0x69, 0x43, 1);
    };
    ESCPOSLabelPrinter.prototype.clearCutAfterPrint = function () {
        this.buffer.push(ESCAPE, 0x69, 0x43, 0);
    };
    ESCPOSLabelPrinter.prototype.clearBold = function () {
        this.buffer.push(ESCAPE, 0x46);
    };
    ESCPOSLabelPrinter.prototype.addText = function (text) {
        var _a;
        (_a = this.buffer).push.apply(_a, text.split('').map(function (chr) {
            return chr.charCodeAt(0);
        }));
    };
    ESCPOSLabelPrinter.prototype.code39 = function (text) {
        text = text.replace('\\', '');
        this.buffer.push(ESCAPE, 0x69);
        this.addText('t0r1h');
        this.buffer.push(0, 100);
        this.addText('w1');
        this.addText(text);
        this.addText('?\\');
    };
    ESCPOSLabelPrinter.prototype.encode = function () {
        var rtnVal = new Uint8Array(this.buffer.length);
        this.buffer.forEach(function (val, idx) {
            rtnVal[idx] = val;
        });
        return rtnVal;
    };
    ESCPOSLabelPrinter.prototype.initialize = function () {
        var _a;
        (_a = this.buffer).push.apply(_a, [0x1b, 0x40]);
        return this;
    };
    ESCPOSLabelPrinter.Alignment = {
        LEFT: 0,
        CENTER: 1,
        RIGHT: 2,
        NONE: 3,
    };
    ESCPOSLabelPrinter.Font = {
        Brougham: 0,
        LetterGothicBold: 1,
        Brussels: 2,
        Helsinki: 3,
        SanDiego: 4,
        LetterGothic: 9,
    };
    return ESCPOSLabelPrinter;
}());
exports.default = ESCPOSLabelPrinter;
//# sourceMappingURL=brother-ql-810w.js.map