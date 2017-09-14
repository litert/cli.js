"use strict";
/*
   +----------------------------------------------------------------------+
   | LiteRT CLI.js Library                                                |
   +----------------------------------------------------------------------+
   | Copyright (c) 2007-2017 Fenying Studio                               |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/cli.js/blob/master/LICENSE                 |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <i.am.x.fenying@gmail.com>                    |
   +----------------------------------------------------------------------+
 */
Object.defineProperty(exports, "__esModule", { value: true });
var STYLES;
(function (STYLES) {
    STYLES[STYLES["RED"] = 1] = "RED";
    STYLES[STYLES["BLACK"] = 2] = "BLACK";
    STYLES[STYLES["YELLOW"] = 4] = "YELLOW";
    STYLES[STYLES["GREEN"] = 8] = "GREEN";
    STYLES[STYLES["BLUE"] = 16] = "BLUE";
    STYLES[STYLES["MAGENTA"] = 32] = "MAGENTA";
    STYLES[STYLES["CYAN"] = 64] = "CYAN";
    STYLES[STYLES["WHITE"] = 128] = "WHITE";
    STYLES[STYLES["GRAY"] = 256] = "GRAY";
    STYLES[STYLES["GREY"] = 256] = "GREY";
    STYLES[STYLES["BG_RED"] = 512] = "BG_RED";
    STYLES[STYLES["BG_BLACK"] = 1024] = "BG_BLACK";
    STYLES[STYLES["BG_YELLOW"] = 2048] = "BG_YELLOW";
    STYLES[STYLES["BG_GREEN"] = 4096] = "BG_GREEN";
    STYLES[STYLES["BG_BLUE"] = 8192] = "BG_BLUE";
    STYLES[STYLES["BG_MAGENTA"] = 16384] = "BG_MAGENTA";
    STYLES[STYLES["BG_CYAN"] = 32768] = "BG_CYAN";
    STYLES[STYLES["BG_WHITE"] = 65536] = "BG_WHITE";
    STYLES[STYLES["BOLD"] = 131072] = "BOLD";
    STYLES[STYLES["LIGHT"] = 131072] = "LIGHT";
    STYLES[STYLES["DARK"] = 262144] = "DARK";
    STYLES[STYLES["DIM"] = 262144] = "DIM";
    STYLES[STYLES["ITALIC"] = 524288] = "ITALIC";
    STYLES[STYLES["UNDERLINE"] = 1048576] = "UNDERLINE";
    STYLES[STYLES["INVERSE"] = 2097152] = "INVERSE";
    STYLES[STYLES["HIDDEN"] = 4194304] = "HIDDEN";
    STYLES[STYLES["THROUGHLINE"] = 8388608] = "THROUGHLINE";
})(STYLES = exports.STYLES || (exports.STYLES = {}));
const COLORS = {
    1: ["\u001b[31m", "\u001b[39m"],
    2: ["\u001b[30m", "\u001b[39m"],
    4: ["\u001b[33m", "\u001b[39m"],
    8: ["\u001b[32m", "\u001b[39m"],
    16: ["\u001b[34m", "\u001b[39m"],
    32: ["\u001b[35m", "\u001b[39m"],
    64: ["\u001b[36m", "\u001b[39m"],
    128: ["\u001b[37m", "\u001b[39m"],
    256: ["\u001b[38m", "\u001b[39m"]
};
const BG_COLORS = {
    512: ["\u001b[41m", "\u001b[49m"],
    1024: ["\u001b[40m", "\u001b[49m"],
    2048: ["\u001b[43m", "\u001b[49m"],
    4096: ["\u001b[42m", "\u001b[49m"],
    8192: ["\u001b[44m", "\u001b[49m"],
    16384: ["\u001b[45m", "\u001b[49m"],
    32768: ["\u001b[46m", "\u001b[49m"],
    65536: ["\u001b[47m", "\u001b[49m"]
};
const EX_STYLES = {
    131072: ["\u001b[1m", "\u001b[22m"],
    262144: ["\u001b[2m", "\u001b[22m"],
    524288: ["\u001b[3m", "\u001b[23m"],
    1048576: ["\u001b[4m", "\u001b[24m"],
    2097152: ["\u001b[7m", "\u001b[27m"],
    4194304: ["\u001b[8m", "\u001b[28m"],
    8388608: ["\u001b[9m", "\u001b[29m"]
};
function wrapColor(text, color) {
    let clr = COLORS[color] || COLORS["default"];
    return clr[0] + text + clr[1];
}
exports.wrapColor = wrapColor;
function colorify(text, styles) {
    let color = COLORS[0x1FF & styles];
    if (color) {
        text = color[0] + text + color[1];
    }
    color = BG_COLORS[0x1FE00 & styles];
    if (color) {
        text = color[0] + text + color[1];
    }
    color = EX_STYLES[0xFE0000 & styles];
    if (color) {
        text = color[0] + text + color[1];
    }
    return text;
}
exports.colorify = colorify;
//# sourceMappingURL=color.js.map