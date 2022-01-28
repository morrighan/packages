// Third-party modules.
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('@cichol/eslint-config', () => {
    it('`index.js` should be parsed without an exception', () => {
        expect(() => {
            // eslint-disable-next-line global-require
            require('..');
        }).not.to.throw();
    });
});
