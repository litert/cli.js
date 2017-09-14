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
const CLI = require("./libcli");
let cli = CLI.createConsole({
    "debug": {
        "color": CLI.STYLES.UNDERLINE
    }
});
cli.warning("hello");
cli.error("world");
cli.json({
    "a": 123
});
(async () => {
    cli.openReader();
    cli.debug(await cli.question("What's your name? "));
    cli.writeLine("How old are you? ");
    cli.debug(await cli.readLine());
    cli.setPrompt("Go> ");
    cli.writeLine(await cli.prompt());
    cli.writeLine(await cli.prompt());
    cli.closeReader();
})();
//# sourceMappingURL=test.js.map