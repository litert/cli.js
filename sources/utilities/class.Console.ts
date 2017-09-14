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

import readline = require("readline");
import colors = require("./color");

import {
    IDictionary,
    RawPromise,
    Exception
} from "@litert/core";

export const E_CONSOLE_CLOSED = 0x0001;

const TEXT_EOL: string = "\n";

export interface IOutputOption {

    color?: number;

    disabled?: boolean;

    stream?: NodeJS.WritableStream;
}

interface IWriter {

    color: number;

    disabled: boolean;

    stream: NodeJS.WritableStream;
}

export interface IConsole {

    /**
     * Write some text into console in specified color.
     */
    write(text: string, colors?: number): IConsole;

    /**
     * Write a line into console in specified color.
     */
    writeLine(text: string, colors?: number): IConsole;

    /**
     * Write some text about error into console.
     */
    error(text: string, eol?: boolean): IConsole;

    /**
     * Write a line about warning into console.
     */
    warning(text: string, eol?: boolean): IConsole;

    /**
     * Write some text about debug into console.
     */
    debug(text: string, eol?: boolean): IConsole;

    /**
     * Write some text about information into console.
     */
    info(text: string, eol?: boolean): IConsole;

    /**
     * Write a line of JSON string of object into console.
     */
    json(data: any, eol?: boolean): IConsole;

    /**
     * Write a question into console and read the answer.
     */
    question(text: string): Promise<string>;

    /**
     * Read a line of text input from console.
     */
    readLine(): Promise<string>;

    /**
     * Read a line of text input from console, with prompt tip displaying.
     */
    prompt(): Promise<string>;

    /**
     * Set up the prefix of console prompt.
     */
    setPrompt(prefix: string): IConsole;

    /**
     * Open the reader of console.
     *
     * You must close the reader manually.
     */
    openReader(): IConsole;

    /**
     * Close the reader of console.
     */
    closeReader(): IConsole;
}

class Console implements IConsole {

    protected _rl: readline.ReadLine;

    protected _writer: IDictionary<IWriter>;

    public constructor(
        opts?: IDictionary<IOutputOption>
    ) {
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

        let optHelper: IDictionary<IOutputOption> = <any> opts;

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

    public openReader(): IConsole {

        if (this._rl) {

            return this;
        }

        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return this;
    }

    public closeReader(): IConsole {

        if (!this._rl) {

            return this;
        }

        this._rl.close();
        delete this._rl;

        return this;
    }

    public setPrompt(prefix: string): IConsole {

        this._rl.setPrompt(prefix);

        return this;
    }

    public async prompt(): Promise<string> {

        let pr = new RawPromise<string, Exception>();

        if (!this._rl) {

            pr.reject(new Exception(
                E_CONSOLE_CLOSED,
                "Please open the reader before reading."
            ));

            return pr.promise;
        }

        this._rl.prompt();
        this._rl.on("line", (data: string): void => {

            this._rl.removeAllListeners("line");
            pr.resolve(data);
        });

        return pr.promise;
    }

    public async question(text: string): Promise<string> {

        let pr = new RawPromise<string, Exception>();

        if (!this._rl) {

            pr.reject(new Exception(
                E_CONSOLE_CLOSED,
                "Please open the reader before reading."
            ));

            return pr.promise;
        }

        this._rl.question(text, (answer) => {

            pr.resolve(answer);
        });

        return pr.promise;
    }

    public async readLine(): Promise<string> {

        let pr = new RawPromise<string, Exception>();

        if (!this._rl) {

            pr.reject(new Exception(
                E_CONSOLE_CLOSED,
                "Please open the reader before reading."
            ));

            return pr.promise;
        }

        this._rl.question("", (answer) => {

            pr.resolve(answer);
        });

        return pr.promise;
    }

    public json(data: any, eol: boolean = true): IConsole {

        if (eol) {

            this.writeLine(JSON.stringify(data, null, 4));
        }
        else {

            this.write(JSON.stringify(data, null, 4));
        }

        return this;
    }

    public write(text: string, color?: number): IConsole {

        let writer = this._writer["text"];

        if (writer.disabled) {

            return this;
        }

        if (writer.stream === process.stdout) {

            writer.stream.write(colors.colorify(
                text,
                color === undefined ? writer.color : color
            ));
        }
        else {

            writer.stream.write(text);
        }

        return this;
    }

    public writeLine(text: string, color?: number): IConsole {

        let writer = this._writer["text"];

        if (writer.disabled) {

            return this;
        }

        if (writer.stream === process.stdout) {

            writer.stream.write(colors.colorify(
                text,
                color === undefined ? writer.color : color
            ));

            writer.stream.write(TEXT_EOL);
        }
        else {

            writer.stream.write(text);
            writer.stream.write(TEXT_EOL);
        }

        return this;
    }

    public error(text: string, eol: boolean = true): IConsole {

        let writer = this._writer["error"];

        if (writer.disabled) {

            return this;
        }

        if (writer.stream === process.stderr) {

            writer.stream.write(colors.colorify(
                text,
                writer.color
            ));

            eol && writer.stream.write(TEXT_EOL);
        }
        else {

            writer.stream.write(text);

            eol && writer.stream.write(TEXT_EOL);
        }

        return this;
    }

    public warning(text: string, eol: boolean = true): IConsole {

        let writer = this._writer["warning"];

        if (writer.disabled) {

            return this;
        }

        if (writer.stream === process.stderr) {

            writer.stream.write(colors.colorify(
                text,
                writer.color
            ));

            eol && writer.stream.write(TEXT_EOL);
        }
        else {

            writer.stream.write(text);

            eol && writer.stream.write(TEXT_EOL);
        }

        return this;
    }

    public debug(text: string, eol: boolean = true): IConsole {

        let writer = this._writer["debug"];

        if (writer.disabled) {

            return this;
        }

        if (writer.stream === process.stdout) {

            writer.stream.write(colors.colorify(
                text,
                writer.color
            ));

            eol && writer.stream.write(TEXT_EOL);
        }
        else {

            writer.stream.write(text);

            eol && writer.stream.write(TEXT_EOL);
        }

        return this;
    }

    public info(text: string, eol: boolean = true): IConsole {

        let writer = this._writer["info"];

        if (writer.disabled) {

            return this;
        }

        if (writer.stream === process.stdout) {

            writer.stream.write(colors.colorify(
                text,
                writer.color
            ));

            eol && writer.stream.write(TEXT_EOL);
        }
        else {

            writer.stream.write(text);

            eol && writer.stream.write(TEXT_EOL);
        }

        return this;
    }
}

export function createConsole(opts?: IDictionary<IOutputOption>): IConsole {

    return new Console(opts);
}
