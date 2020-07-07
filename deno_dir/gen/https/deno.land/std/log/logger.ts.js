// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { LogLevels, getLevelByName, getLevelName, } from "./levels.ts";
export class LogRecord {
    constructor(options) {
        this.msg = options.msg;
        this.#args = [...options.args];
        this.level = options.level;
        this.loggerName = options.loggerName;
        this.#datetime = new Date();
        this.levelName = getLevelName(options.level);
    }
    #args;
    #datetime;
    get args() {
        return [...this.#args];
    }
    get datetime() {
        return new Date(this.#datetime.getTime());
    }
}
export class Logger {
    constructor(loggerName, levelName, options = {}) {
        this.#loggerName = loggerName;
        this.#level = getLevelByName(levelName);
        this.#handlers = options.handlers || [];
    }
    #level;
    #handlers;
    #loggerName;
    get level() {
        return this.#level;
    }
    set level(level) {
        this.#level = level;
    }
    get levelName() {
        return getLevelName(this.#level);
    }
    set levelName(levelName) {
        this.#level = getLevelByName(levelName);
    }
    get loggerName() {
        return this.#loggerName;
    }
    set handlers(hndls) {
        this.#handlers = hndls;
    }
    get handlers() {
        return this.#handlers;
    }
    /** If the level of the logger is greater than the level to log, then nothing
     * is logged, otherwise a log record is passed to each log handler.  `msg` data
     * passed in is returned.  If a function is passed in, it is only evaluated
     * if the msg will be logged and the return value will be the result of the
     * function, not the function itself, unless the function isn't called, in which
     * case undefined is returned.  All types are coerced to strings for logging.
     */
    _log(level, msg, ...args) {
        if (this.level > level) {
            return msg instanceof Function ? undefined : msg;
        }
        let fnResult;
        let logMessage;
        if (msg instanceof Function) {
            fnResult = msg();
            logMessage = this.asString(fnResult);
        }
        else {
            logMessage = this.asString(msg);
        }
        const record = new LogRecord({
            msg: logMessage,
            args: args,
            level: level,
            loggerName: this.loggerName,
        });
        this.#handlers.forEach((handler) => {
            handler.handle(record);
        });
        return msg instanceof Function ? fnResult : msg;
    }
    asString(data) {
        if (typeof data === "string") {
            return data;
        }
        else if (data === null ||
            typeof data === "number" ||
            typeof data === "bigint" ||
            typeof data === "boolean" ||
            typeof data === "undefined" ||
            typeof data === "symbol") {
            return String(data);
        }
        else if (typeof data === "object") {
            return JSON.stringify(data);
        }
        return "undefined";
    }
    debug(msg, ...args) {
        return this._log(LogLevels.DEBUG, msg, ...args);
    }
    info(msg, ...args) {
        return this._log(LogLevels.INFO, msg, ...args);
    }
    warning(msg, ...args) {
        return this._log(LogLevels.WARNING, msg, ...args);
    }
    error(msg, ...args) {
        return this._log(LogLevels.ERROR, msg, ...args);
    }
    critical(msg, ...args) {
        return this._log(LogLevels.CRITICAL, msg, ...args);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxPQUFPLEVBQ0wsU0FBUyxFQUNULGNBQWMsRUFDZCxZQUFZLEdBRWIsTUFBTSxhQUFhLENBQUM7QUFVckIsTUFBTSxPQUFPLFNBQVM7SUFRcEIsWUFBWSxPQUF5QjtRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBYkQsS0FBSyxDQUFZO0lBQ2pCLFNBQVMsQ0FBTztJQWFoQixJQUFJLElBQUk7UUFDTixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQU1ELE1BQU0sT0FBTyxNQUFNO0lBS2pCLFlBQ0UsVUFBa0IsRUFDbEIsU0FBb0IsRUFDcEIsVUFBeUIsRUFBRTtRQUUzQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFH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