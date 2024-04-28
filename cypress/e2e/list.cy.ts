import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import {
	circle,
	circleChanging,
	circleContent,
	circleDefault,
	circleModified,
	circleSmall,
	circlesSelector,
} from './constants'

const values = ['0', '1', '8', '34']
const circles = '[class^=list-page_circles]'
const valueInput = '#value'
const addButton = '#adding'
const indexInput = '#index'
const indexActionsButton = '#indexActions'

describe('Проверка Связного списка', () => {
	beforeEach(() => {
		cy.visit('/list')
		values.forEach(value => {
			cy.get(valueInput).type(value)
			cy.get(addButton).click()
		})
		cy.wait(SHORT_DELAY_IN_MS)
	})

	it('корректное отображение дефолтного списка', () => {
		const testValues = values.reverse()
		cy.get(circlesSelector).should('have.length', testValues.length)

		testValues.forEach((value, index) => {
			cy.get(circles)
				.eq(index + 1)
				.find(circle)
				.should('contain.text', value)
		})
	})

	it('при пустом поле ввода значений кнопки добавления не активны', () => {
		cy.get(valueInput).should('be.empty')
		cy.get(addButton).should('be.disabled')
	})

	it('при пустом поле ввода индекса кнопки добавления и удаления по индексу не активны', () => {
		cy.get(indexInput).should('be.empty')
		cy.get(indexActionsButton).should('be.disabled')
	})

	it('корректное добавление элемента в Head', () => {
		cy.get('input').first().type('14')
		cy.contains('button', 'Добавить в head').click()
		cy.get(circleChanging).contains('14')
		cy.wait(DELAY_IN_MS)
		cy.get(circleContent)
			.should('have.length', 5)
			.each((element, index) => {
				index === 0 && expect(element).contain('14')
				index === 0 && expect(element).contain('Head')
				index === 4 && expect(element).contain('Tail')
			})
		cy.get(circleDefault).contains('14')
	})

	it('корректное добавление элемента в Tail', () => {
		cy.get('input').first().type('14')
		cy.contains('button', 'Добавить в tail').click()
		cy.get(circleModified).contains('14')
		cy.wait(DELAY_IN_MS)
		cy.get(circleContent)
			.should('have.length', 5)
			.each((element, index) => {
				index === 4 && expect(element).contain('14')
				index === 4 && expect(element).contain('Tail')
			})
		cy.get(circleDefault).contains('14')
	})

	it('корректное удаление элемента из Head', () => {
		cy.contains('button', 'Удалить из head').click()
		cy.get(circleSmall)
		cy.get(circleChanging)
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circleContent).first().contains('Head')
		cy.get(circleContent).should('have.length', 3)
	})

	it('корректное удаление элемента из Tail', () => {
		cy.contains('button', 'Удалить из tail').click()
		cy.get(circleSmall)
		cy.get(circleChanging)
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circleContent).last().contains('Tail')
		cy.get(circleContent).last()
		cy.get(circleContent).should('have.length', 3)
	})

	it('корректное добавление элемента по индексу', () => {
		cy.get('input').first().type('14')
		cy.get('input').eq(1).type('1')
		cy.contains('button', 'Добавить по индексу').click()
		cy.get(circleContent).should('have.length', 5)
		cy.get(circleModified).contains('14')
		cy.get(circleDefault).contains('14')
		cy.get(circleContent).eq(1).contains('14')
	})

	it('корректное удаление элемента по индексу', () => {
		cy.get('input').eq(1).type('1')
		cy.contains('button', 'Удалить по индексу').click()
		cy.get(circleContent).eq(0).find(circleChanging)
		cy.get(circleSmall)
		cy.get(circleContent).should('have.length', 3)
	})
})
