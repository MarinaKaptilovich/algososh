import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Button } from './button'

it('корректный рендер кнопки с текстом', () => {
	const tree = renderer.create(<Button text='Нажать на кнопку' />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер кнопки без текста', () => {
	const tree = renderer.create(<Button />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер заблокированной кнопки', () => {
	const tree = renderer.create(<Button disabled={true} />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер кнопки с индикацией загрузки', () => {
	const tree = renderer.create(<Button isLoader={true} />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный вызов колбека при клике на кнопку', () => {
	const onClickMock = jest.fn()
	render(<Button text='Нажать на кнопку' onClick={onClickMock} />)
	fireEvent.click(screen.getByText('Нажать на кнопку'))
	expect(onClickMock).toHaveBeenCalledTimes(1)
})
