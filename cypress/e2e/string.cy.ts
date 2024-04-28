import { buttonSubmit, circle, inputSelector } from './constants'

const setInputTest = (i: string, input: string) => cy.get(input).type(i)
const circles = () => cy.get('[class^=string_circles]').children()
const values = 'hello'

describe('Проверка строки', () => {
	beforeEach(() => {
		cy.visit('/recursion')
	})

	it('при пустом поле ввода значений кнопка не активна', () => {
		cy.get(inputSelector).should('be.empty')
		cy.get(buttonSubmit).should('be.disabled')
	})

	it('корректный разворот строки', () => {
		setInputTest(values, inputSelector)
		cy.get(buttonSubmit).click()

		circles().should('have.length', values.length)

		for (let i = 0; i < values.length / 2; i++) {
			circles()
				.eq(i)
				.find(circle)
				.should('have.attr', 'class')
				.and('include', 'changing')
				.then(() =>
					circles()
						.find(circle)
						.should('have.attr', 'class')
						.should('include', 'modified')
				)
			circles().should('contain.text', values[values.length - i - 1])
		}
	})
})
