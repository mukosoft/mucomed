const logSymbol = "Info";
const successSymbol = "👌";
const errorSymbol = "🔥";
const warningSymbol = "⚠️";

export default class Logger {
    static log(message, method) {
        console.log(`${logSymbol} - ${message}${(method) && ` on method ${method}`}`)
    }

    static success(message, method) {
        console.success(`${successSymbol} - ${message}${(method) && ` on method ${method}`}`)
    }

    static error(message, method) {
        console.error(`${errorSymbol} - ${message}${(method) && ` on method ${method}`}`)
    }

    static warning(message, method) {
        console.warn(`${warningSymbol} - ${message}${(method) && ` on method ${method}`}`)
    }
}