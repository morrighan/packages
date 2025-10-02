// Third-party modules.
import { test, expect } from 'vitest'
import postcss from 'postcss'
import stylelint from 'stylelint'
import { version } from 'stylelint/package.json' with { type: 'json' }

// Testing target.
import PROPERTIES_LIST from '../properties'
import config from '..'

function indexOf(propertyName: string): number {
	return PROPERTIES_LIST.includes(propertyName)
		? PROPERTIES_LIST.indexOf(propertyName)
		: Number.NaN
}

test('should have a properties list sorted as designed', () => {
	//
	expect(indexOf('min-width')).to.be.lessThan(indexOf('width'))
	expect(indexOf('max-width')).to.be.greaterThan(indexOf('width'))

	//
	expect(indexOf('border-top-color')).to.be.lessThan(indexOf('border-bottom-color'))
	expect(indexOf('border-top-right-radius')).to.be.lessThan(indexOf('border-bottom-left-radius'))

	//
	expect(indexOf('font')).to.be.lessThan(indexOf('font-style'))
	expect(indexOf('transform')).to.be.greaterThan(indexOf('transform-style'))
})

test(`should work properly w/ Stylelint v${version}`, async () => {
	const result = postcss([ stylelint(config) ]).process('', { from: 'test.css' })

	await expect(result).resolves.to.have.own.property('css')
})
