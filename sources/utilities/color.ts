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

import { IDictionary } from "@litert/core";

export enum STYLES {

    RED = 0x00000001,
    BLACK = 0x00000002,
    YELLOW = 0x00000004,
    GREEN = 0x00000008,
    BLUE = 0x00000010,
    MAGENTA = 0x00000020,
    CYAN = 0x00000040,
    WHITE = 0x00000080,
    GRAY = 0x00000100,
    GREY = 0x00000100,

    BG_RED = 0x00000200,
    BG_BLACK = 0x00000400,
    BG_YELLOW = 0x00000800,
    BG_GREEN = 0x00001000,
    BG_BLUE = 0x00002000,
    BG_MAGENTA = 0x00004000,
    BG_CYAN = 0x00008000,
    BG_WHITE = 0x00010000,

    BOLD = 0x00020000,
    LIGHT = 0x00020000,
    DARK = 0x00040000,
    DIM = 0x00040000,
    ITALIC = 0x00080000,
    UNDERLINE = 0x00100000,
    INVERSE = 0x00200000,
    HIDDEN = 0x00400000,
    THROUGHLINE = 0x00800000
}

type ColorTuple = [string, string];

const COLORS: IDictionary<ColorTuple> = {

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

const BG_COLORS: IDictionary<ColorTuple> = {

    512: ["\u001b[41m", "\u001b[49m"],

    1024: ["\u001b[40m", "\u001b[49m"],

    2048: ["\u001b[43m", "\u001b[49m"],

    4096: ["\u001b[42m", "\u001b[49m"],

    8192: ["\u001b[44m", "\u001b[49m"],

    16384: ["\u001b[45m", "\u001b[49m"],

    32768: ["\u001b[46m", "\u001b[49m"],

    65536: ["\u001b[47m", "\u001b[49m"]
};

const EX_STYLES: IDictionary<ColorTuple> = {

    131072: ["\u001b[1m", "\u001b[22m"],

    262144: ["\u001b[2m", "\u001b[22m"],

    524288: ["\u001b[3m", "\u001b[23m"],

    1048576: ["\u001b[4m", "\u001b[24m"],

    2097152: ["\u001b[7m", "\u001b[27m"],

    4194304: ["\u001b[8m", "\u001b[28m"],

    8388608: ["\u001b[9m", "\u001b[29m"]
};

export function wrapColor(text: string, color: string) {

    let clr: ColorTuple = COLORS[color] || COLORS["default"];

    return clr[0] + text + clr[1];
}

export function colorify(text: string, styles: number): string {

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
