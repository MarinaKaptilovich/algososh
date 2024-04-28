import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import {
	buttonSubmit,
	circle,
	circleChanging,
	circleContent,
	circleDefault,
	inputSelector,
} from './constants'

const values = ['0', '1', '8', '34']

const addElements = (value: string) => {
	cy.get('input').type(value)
	cy.contains('button', 'Добавить').click()
	cy.get(circleChanging).contains(value)
	cy.wait(SHORT_DELAY_IN_MS)
	cy.get(circleDefault).contains(value)
}

const deleteElements = (value: string) => {
	cy.contains('button', 'Удалить').click()
	cy.get(circle).each((element, index) => {
		if (index === values.length - 1) {
			expect(element.text()).to.contains(value)
		}
	})
}

describe('Проверка Стека', () => {
	beforeEach(() => {
		cy.visit('/stack')
	})

	it('при пустом поле ввода значений кнопка добавления не активна', () => {
		cy.get(inputSelector).should('be.empty')
		cy.get(buttonSubmit).should('be.disabled')
	})

	it('корректное добавление в стек', () => {
		values.forEach((item: string, index: number) => {
			addElements(item)
			cy.get(circleContent).as('circle')
			cy.get('@circle')
				.should('have.length', index + 1)
				.each((element, idx) => {
					idx === index && expect(element.text()).to.contain(item)
				})
		})
	})

	it('корректное удаление из стека', () => {
		values.forEach((item: string) => addElements(item))
		cy.get(circleContent).as('circle')
		deleteElements(values[3])
		cy.get('@circle')
			.should('have.length', values.length - 1)
			.each((element, index) => {
				expect(element.text()).to.contains(values[index])
			})
	})

	it('корректная очистка стека', () => {
		values.forEach((item: string) => addElements(item))
		cy.contains('button', 'Очистить').click()
		cy.get(circleContent).should('have.length', 0)
	})
})
