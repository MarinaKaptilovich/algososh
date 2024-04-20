import { buttonSubmit, inputSelector } from './constants'

describe('Проверка Стека', () => {
	beforeEach(() => {
		cy.visit('/stack')
	})

	it('при пустом поле ввода значений кнопка добавления не активна', () => {
		cy.get(inputSelector).should('be.empty')
		cy.get(buttonSubmit).should('be.disabled')
	})
})
