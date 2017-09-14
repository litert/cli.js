/// <reference types="node" />
import { IDictionary } from "@litert/core";
export declare const E_CONSOLE_CLOSED = 1;
export interface IOutputOption {
    color?: number;
    disabled?: boolean;
    stream?: NodeJS.WritableStream;
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
export declare function createConsole(opts?: IDictionary<IOutputOption>): IConsole;
