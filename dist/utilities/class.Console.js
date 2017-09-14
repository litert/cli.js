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
const readline = require("readline");
const colors = require("./color");
const core_1 = require("@litert/core");
exports.E_CONSOLE_CLOSED = 0x0001;
const TEXT_EOL = "\n";
class Console {
    constructor(opts) {
        this._writer = {
            "warning": {
                "color": colors.STYLES.YELLOW | colors.STYLES.DARK,
                "stream": process.stderr,
                "disabled": false
            },
            "error": {
                "color": colors.STYLES.RED | colors.STYLES.DARK,
                "stream": process.stderr,
                "disabled": false
            },
            "info": {
                "color": colors.STYLES.CYAN | colors.STYLES.LIGHT,
                "stream": process.stdout,
                "disabled": false
            },
            "text": {
                "color": 0,
                "stream": process.stdout,
                "disabled": false
            },
            "debug": {
                "color": colors.STYLES.GRAY | colors.STYLES.DARK,
                "stream": process.stdout,
                "disabled": false
            }
        };
        if (!opts) {
            return;
        }
        let optHelper = opts;
        for (let type in this._writer) {
            let writer = optHelper[type];
            if (!writer) {
                continue;
            }
            if (writer.stream !== undefined) {
                this._writer[type].stream = writer.stream;
            }
            if (writer.color !== undefined) {
                this._writer[type].color = writer.color;
            }
            if (writer.disabled !== undefined) {
                this._writer[type].disabled = writer.disabled;
            }
        }
    }
    openReader() {
        if (this._rl) {
            return this;
        }
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return this;
    }
    closeReader() {
        if (!this._rl) {
            return this;
        }
        this._rl.close();
        delete this._rl;
        return this;
    }
    setPrompt(prefix) {
        this._rl.setPrompt(prefix);
        return this;
    }
    async prompt() {
        let pr = new core_1.RawPromise();
        if (!this._rl) {
            pr.reject(new core_1.Exception(exports.E_CONSOLE_CLOSED, "Please open the reader before reading."));
            return pr.promise;
        }
        this._rl.prompt();
        this._rl.on("line", (data) => {
            this._rl.removeAllListeners("line");
            pr.resolve(data);
        });
        return pr.promise;
    }
    async question(text) {
        let pr = new core_1.RawPromise();
        if (!this._rl) {
            pr.reject(new core_1.Exception(exports.E_CONSOLE_CLOSED, "Please open the reader before reading."));
            return pr.promise;
        }
        this._rl.question(text, (answer) => {
            pr.resolve(answer);
        });
        return pr.promise;
    }
    async readLine() {
        let pr = new core_1.RawPromise();
        if (!this._rl) {
            pr.reject(new core_1.Exception(exports.E_CONSOLE_CLOSED, "Please open the reader before reading."));
            return pr.promise;
        }
        this._rl.question("", (answer) => {
            pr.resolve(answer);
        });
        return pr.promise;
    }
    json(data, eol = true) {
        if (eol) {
            this.writeLine(JSON.stringify(data, null, 4));
        }
        else {
            this.write(JSON.stringify(data, null, 4));
        }
        return this;
    }
    write(text, color) {
        let writer = this._writer["text"];
        if (writer.disabled) {
            return this;
        }
        if (writer.stream === process.stdout) {
            writer.stream.write(colors.colorify(text, color === undefined ? writer.color : color));
        }
        else {
            writer.stream.write(text);
        }
        return this;
    }
    writeLine(text, color) {
        let writer = this._writer["text"];
        if (writer.disabled) {
            return this;
        }
        if (writer.stream === process.stdout) {
            writer.stream.write(colors.colorify(text, color === undefined ? writer.color : color));
            writer.stream.write(TEXT_EOL);
        }
        else {
            writer.stream.write(text);
            writer.stream.write(TEXT_EOL);
        }
        return this;
    }
    error(text, eol = true) {
        let writer = this._writer["error"];
        if (writer.disabled) {
            return this;
        }
        if (writer.stream === process.stderr) {
            writer.stream.write(colors.colorify(text, writer.color));
            eol && writer.stream.write(TEXT_EOL);
        }
        else {
            writer.stream.write(text);
            eol && writer.stream.write(TEXT_EOL);
        }
        return this;
    }
    warning(text, eol = true) {
        let writer = this._writer["warning"];
        if (writer.disabled) {
            return this;
        }
        if (writer.stream === process.stderr) {
            writer.stream.write(colors.colorify(text, writer.color));
            eol && writer.stream.write(TEXT_EOL);
        }
        else {
            writer.stream.write(text);
            eol && writer.stream.write(TEXT_EOL);
        }
        return this;
    }
    debug(text, eol = true) {
        let writer = this._writer["debug"];
        if (writer.disabled) {
            return this;
        }
        if (writer.stream === process.stdout) {
            writer.stream.write(colors.colorify(text, writer.color));
            eol && writer.stream.write(TEXT_EOL);
        }
        else {
            writer.stream.write(text);
            eol && writer.stream.write(TEXT_EOL);
        }
        return this;
    }
    info(text, eol = true) {
        let writer = this._writer["info"];
        if (writer.disabled) {
            return this;
        }
        if (writer.stream === process.stdout) {
            writer.stream.write(colors.colorify(text, writer.color));
            eol && writer.stream.write(TEXT_EOL);
        }
        else {
            writer.stream.write(text);
            eol && writer.stream.write(TEXT_EOL);
        }
        return this;
    }
}
function createConsole(opts) {
    return new Console(opts);
}
exports.createConsole = createConsole;
//# sourceMappingURL=class.Console.js.map