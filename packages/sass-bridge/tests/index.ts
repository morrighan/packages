// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/extensions */

// Third-party modules.
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as sass from 'sass';

// Testing target.
import { getFunctions } from '../releases/esm.js';

describe('@cichol/sass-bridge', () => {
    it('should be working properly', async () => {
        const source = `
            body > *:first-child:after {
                content: custom-function('HELLO', 'world');
                line-height: sqrt-cos(${2 * Math.PI});
            }
        `;

        const functions = await getFunctions(
            import('./artifacts/custom-function.ts'),
            import('./artifacts/sqrt-cos.ts')
        );

        const { css: result } = await sass.compileStringAsync(source, { functions });

        expect(result).to.includes('content: "helloWORLD";');
        expect(result).to.includes('line-height: 1;');
    });
});
