import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { buttonSubmit, inputSelector } from './constants'

const circles = () => cy.get('div[class^="fibonacci-page_circles"]').children()

describe('Проверка Фибоначчи', () => {
	beforeEach(() => {
		cy.visit('/fibonacci')
	})

	it('при пустом поле ввода кнопка "Рассчитать" недоступна', () => {
		cy.get(inputSelector).click()
		cy.get(buttonSubmit).should('be.disabled')
	})

	it('числа генерируются корректно', () => {
		const expected = [1, 1, 2, 3, 5]
		const test = '5'

		cy.get(inputSelector).type(test)
		cy.get(buttonSubmit).click()

		cy.wait(SHORT_DELAY_IN_MS)

		circles()
			.should('have.length', test)
			.each((circle, index) => {
				cy.wrap(circle).should('contain.text', expected[index])
			})
	})
})
