import 'reflect-metadata';

// Node.js built-in APIs.
import { IncomingMessage as HttpRequest, ServerResponse as HttpResponse } from 'http';
import { PassThrough } from 'stream';

// Third-party modules.
import Promise from 'bluebird';
import lodash from 'lodash';
import morgan from 'morgan';
import type { level as LoggingLevel } from 'winston';
import winston, { Logger as BaseLogger } from 'winston';

// Formatters.
import formatForCLI from '../formatters/command-line';
import formatForMorgan from '../formatters/morgan';

// Local helpers.
import { ExecutionMode, executionMode } from '../helpers/constants';

// Handler implementations.
import type { LoggingLevelName } from '../handlers';
import handlers from '../handlers';

// Type definitions.
type Morgan = (req: HttpRequest, res: HttpResponse, next: (error?: Error) => void) => void;

// Transports.
const { Console: ConsoleTransport } = winston.transports;

// Keys in order to access private properties.
const KeyOfInstance: unique symbol = Symbol('@cichol/logger::classes/logger::Instance');
const KeyOfPassport: unique symbol = Symbol('@cichol/logger::classes/logger::Passport');

class Logger {
    #logger: BaseLogger = winston.createLogger({
        levels: lodash(handlers)
            .map(({ name, level }) => [ name, level ])
            .filter(([ , level ]) => typeof level === 'number')
            .fromPairs()
            .value(),

        level: (executionMode === ExecutionMode.ProductionMode ? 'http' : 'verbose') as LoggingLevel,

        transports: [
            new ConsoleTransport({ format: formatForCLI })
        ],

        exitOnError: false
    });

    #morgan: Morgan = morgan(formatForMorgan, {
        stream: new PassThrough({ objectMode: true }).on('data', (data: string) => {
            this.log('http', data.trim());
        })
    }) as Morgan;

    private constructor(passport: typeof KeyOfPassport) {
        if (passport !== KeyOfPassport) {
            throw new ReferenceError('Logger class cannot be constructed in directly');
        }
    }

    public static get instance(): Logger {
        if (this !== Logger) {
            throw new ReferenceError('Logger class is not inheritable');
        }

        if (Reflect.hasOwnMetadata(KeyOfInstance, Logger)) {
            return Reflect.getOwnMetadata(KeyOfInstance, Logger);
        }

        const instance = new Logger(KeyOfPassport);

        try {
            return instance;
        } finally {
            Reflect.defineMetadata(KeyOfInstance, instance, Logger);
        }
    }

    /**
     * Logging message with specific level.
     *
     * @param level
     * @param message
     * @param args Additional metadata.
     */
    public log(level: LoggingLevelName, message: string, ...args: any[]): void;

    /**
     * Logging HTTP I/O.
     *
     * @param request Node.js built-in `IncomingMessage` instance from `http` module.
     * @param response Node.js built-in `ServerResponse` instance from `http` module.
     */
    public log(request: HttpRequest, response: HttpResponse): Promise<void>;

    /**
     * Logging errors in detail.
     *
     * @param error
     */
    public log(error: Error): void;

    public log(...args: any[]): void | Promise<void> {
        const logger = this.#logger;
        const morgan = this.#morgan;

        switch (true) {
        case (args.length >= 2 && args[0] instanceof HttpRequest && args[1] instanceof HttpResponse): {
            const [ request, response ] = args as [ HttpRequest, HttpResponse ];

            return Promise.fromCallback<void>(callback => morgan(request, response, callback));
        }

        case (args.length >= 1 && args[0] instanceof Error): {
            const [ error, ...data ] = args as [ Error, ...any[] ];

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            logger.log('error', error.message, error, ...data);

            return undefined;
        }

        default: {
            const [ level, message, ...data ] = args as [ LoggingLevel, string, ...any[] ];

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            logger.log(level, message, ...data);

            return undefined;
        }
        }
    }
}

export default Logger.instance;
