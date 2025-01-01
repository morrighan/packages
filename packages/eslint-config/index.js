// Configuration fragments.
import { configuration as fragmentForJavaScript } from './fragments/javascript.js'
import { configuration as fragmentForJSX } from './fragments/javascript-react.js'
import { configuration as fragmentForTypeScript } from './fragments/typescript.js'
import { configuration as fragmentForTSX } from './fragments/typescript-react.js'

/**
 * @param {import('eslint').Linter.Config[]} extraConfigs
 * @returns {import('eslint').Linter.Config[]}
 */
function defineConfig(...extraConfigs) {
    const baseConfiguration = [
        ...fragmentForJavaScript,
        ...fragmentForJSX,
        ...fragmentForTypeScript,
        ...fragmentForTSX,
    ]

    return [ ...baseConfiguration, ...extraConfigs ]
}

// Exporting.
export default defineConfig
