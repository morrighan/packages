// Third-party modules.
import { describe, it } from 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('@cichol/eslint-config', () => {
    it('`index.js` should be parsed without an exception', () => {
        expect(import('..')).not.to.eventually.throw();
    });
});
