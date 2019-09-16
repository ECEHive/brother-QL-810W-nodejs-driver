"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ESCPOSLabelPrinter = /** @class */ (function () {
    function ESCPOSLabelPrinter() {
        this.buffer = [];
    }
    ESCPOSLabelPrinter.prototype.clear = function () {
        this.buffer = new Array();
    };
    ESCPOSLabelPrinter.prototype.initialize = function () {
        var _a;
        (_a = this.buffer).push.apply(_a, [0x1b, 0x69, 0x61, 0x00]);
        return this;
    };
    return ESCPOSLabelPrinter;
}());
exports.default = ESCPOSLabelPrinter;
//# sourceMappingURL=brother-ql-810w.js.map