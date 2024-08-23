// Node.js built-in APIs.
import { createRequire } from 'module';

// Third-party modules.
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('@cichol/eslint-config', () => {
    it('`index.js` should be parsed without an exception', () => {
        const require = createRequire(import.meta.url);

        expect(() => {
            require('..');
        }).not.to.throw();
    });
});
