// Local helpers.
import { configurate } from '../helpers/configurator.js'

export const configuration = configurate({
    files: [ '**/*.tsx' ],

    rules: {
        /**
         * Prefers to use TypeScript's typings instead of `prop-types` module.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md}
         */
        'react/prop-types': 'off',
    },
})

export default configuration
