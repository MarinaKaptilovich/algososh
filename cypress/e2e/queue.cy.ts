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
	cy.wait(SHORT_DELAY_IN_MS)
	cy.get(circleDefault).contains(value)
}

const removeElements = (value: string) => {
	cy.contains('button', 'Удалить').click()
	cy.get(circleChanging).contains(value)
}

describe('Проверка Очереди', () => {
	beforeEach(() => {
		cy.visit('/queue')
	})

	it('при пустом поле ввода значений кнопка добавления не активна', () => {
		cy.get(inputSelector).should('be.empty')
		cy.get(buttonSubmit).should('be.disabled')
	})

	it('корректное добавление в очередь', () => {
		addElements(values[0])
		cy.get(circleContent).as('circle')
		cy.get('@circle')
			.eq(0)
			.should('contain', values[0])
			.and('contain', 'head')
			.and('contain', 'tail')

		addElements(values[1])
		cy.get('@circle').each((element, index) => {
			index === 1 && expect(element.text()).to.contain(values[1])
			index === 0 && expect(element.text()).to.contain('head')
			index === 1 && expect(element.text()).to.contain('tail')
		})
	})

	it('корректное удаление из очереди', () => {
		values.forEach((item: string) => addElements(item))
		cy.get(circleContent).as('circle')
		removeElements(values[0])
		cy.get('@circle').each((element, index) => {
			index === 0 && expect(element.text()).to.contain(values[0])
			if (index === 1) {
				expect(element.text()).to.contain(values[1])
			}
		})

		cy.wait(SHORT_DELAY_IN_MS)
		cy.get('@circle').eq(1).should('contain', 'head')
	})

	it('корректная очистка очереди', () => {
		values.forEach((item: string) => addElements(item))
		cy.contains('Очистить').click()
		cy.get(circle).should('have.text', '')
	})
})
