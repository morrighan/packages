// Node.js built-in APIs.
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from 'module'; // eslint-disable-line node/no-unsupported-features/node-builtins

// Third-party modules.
import * as Babel from '@babel/core';

// Use this file as a customization hook as-is.
const KeyOfRegister = Symbol('@cichol/packages::scripts/register::KeyOfRegister');

if (!globalThis[KeyOfRegister]) {
    register(import.meta.filename, import.meta.url);
    Reflect.defineProperty(globalThis, KeyOfRegister, { value: true });
}

/**
 * @param {string} url
 * @param {{ format?: string; }} context
 * @param {(url: string) => Promise<any>} nextLoad
 * @returns {Promise<{ format: string; shortCircuit?: boolean; source: string; }>}
 */
export default async function load(url, context, nextLoad) {
    if (context.format === 'builtin' || (!context.format && url.startsWith('node:'))) {
        return nextLoad(url);
    }

    const pathname = fileURLToPath(url);
    const extension = path.extname(pathname);

    if (context.format || extension !== '.ts') {
        return nextLoad(url);
    }

    const result = await Babel.transformFileAsync(pathname);

    return { format: 'module', shortCircuit: true, source: result.code };
}

export { load };
