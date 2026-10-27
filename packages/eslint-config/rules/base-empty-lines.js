const variables = [ 'const', 'let', 'var', 'using' ]
const types = [ 'type', 'interface', 'enum' ]
const multilineVariables = [ 'multiline-const', 'multiline-let', 'multiline-var', 'multiline-using' ]
const controlFlow = [ 'if', 'for', 'while', 'do', 'switch', 'try' ]
const syncCall = { selector: 'ExpressionStatement[expression.type="CallExpression"]' }
const asyncCall = { selector: 'ExpressionStatement[expression.type="AwaitExpression"]' }
const blockBodyConst = { selector: 'VariableDeclaration[kind="const"]:has(ArrowFunctionExpression[body.type="BlockStatement"])' }
const always = (prev, next) => ({ blankLine: 'always', prev, next })
const any = (prev, next) => ({ blankLine: 'any', prev, next })

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
	'@stylistic/lines-between-class-members': [ 'error', {
		enforce: [ {
			blankLine: 'always',
			prev: '*',
			next: 'method',
		}, {
			blankLine: 'always',
			prev: 'method',
			next: '*',
		} ],
	} ],

	'@stylistic/no-multiple-empty-lines': [ 'error', { max: 1, maxBOF: 0, maxEOF: 0 } ],

	'@stylistic/padding-line-between-statements': [
		'error',

		// 1. Directives
		always('directive', '*'),
		any('directive', 'directive'),

		// 2. Imports
		always('import', '*'),
		any('import', 'import'),

		// 3. Variable declarations
		always(variables, '*'),
		any(variables, variables),

		// 4. TypeScript declarations
		always(types, '*'),
		always('*', types),
		any([ 'type', 'interface' ], [ 'type', 'interface' ]),

		// 5. Control flow
		always('*', controlFlow),
		always('block-like', '*'),

		// 6. Functions and classes
		always('*', [ 'function', 'class' ]),
		any('function-overload', 'function-overload'),
		any('function-overload', 'function'),

		// 7. Early exits
		always('*', [ 'return', 'throw' ]),

		// 8. Synchronous / asynchronous calls
		always(syncCall, asyncCall),
		always(asyncCall, syncCall),

		// 9. Multiline declarations
		always('*', multilineVariables),
		always(multilineVariables, '*'),

		// 10. Block-bodied arrow functions / callbacks
		always('*', blockBodyConst),
		always(blockBodyConst, '*'),
	],

	'@stylistic/padded-blocks': [ 'error', { blocks: 'never', classes: 'never', switches: 'never' }, { allowSingleLineBlocks: true } ],

}

export default rules
