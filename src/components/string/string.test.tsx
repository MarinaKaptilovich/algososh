import { getReverse } from './utils'

it('корректный разворот строки с чётным количеством символов', () => {
	const reversed = getReverse('hello!')
	const final = reversed[reversed.length - 1]
	expect(final.arr.join('')).toBe('!olleh')
})

it('корректный разворот строки с нечетным количеством символов', () => {
	const reversed = getReverse('hello')
	const final = reversed[reversed.length - 1]
	expect(final.arr.join('')).toBe('olleh')
})

it('корректный разворот строки с одним символом', () => {
	const reversed = getReverse('!')
	const final = reversed[reversed.length - 1]
	expect(final.arr.join('')).toBe('!')
})

it('корректный разворот пустой строки', () => {
	const reversed = getReverse('')
	const final = reversed[reversed.length - 1]
	expect(final.arr.join('')).toBe('')
})
