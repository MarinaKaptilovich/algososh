import { Direction } from '../../types/direction'
import { ElementStates } from '../../types/element-states'
import { ArrayElement, sortByBubble, sortBySelection } from './utils'

describe('сортировка пузырьком', () => {
	it('корректная сортировка пустого массива', () => {
		let result: ArrayElement[] = []
		const setArray = (arr: ArrayElement[]) => {
			result = arr
		}
		sortByBubble([], Direction.Ascending, setArray)

		expect(result).toBeInstanceOf(Array)
		expect(result).toHaveLength(0)
	})

	it('корректная сортировка массива с одним элементом', () => {
		let result: ArrayElement[] = []
		const setArray = (arr: ArrayElement[]) => {
			result = arr
		}
		sortByBubble(
			[{ value: 1, state: ElementStates.Default }],
			Direction.Ascending,
			setArray
		)

		expect(result).toEqual([{ value: 1, state: ElementStates.Modified }])
	})

	it('корректная сортировка массива с несколькими элементами в порядке возрастания', async () => {
		const arr: ArrayElement[] = [
			{ value: 3, state: ElementStates.Default },
			{ value: 1, state: ElementStates.Default },
			{ value: 2, state: ElementStates.Default },
		]
		const setArray = jest.fn()

		await sortByBubble(arr, Direction.Ascending, setArray)

		const sortedArr = arr.map(element => element.value)

		expect(sortedArr).toEqual([1, 2, 3])
	})

	it('корректная сортировка массива с несколькими элементами в порядке убывания', async () => {
		const arr: ArrayElement[] = [
			{ value: 3, state: ElementStates.Default },
			{ value: 1, state: ElementStates.Default },
			{ value: 2, state: ElementStates.Default },
		]
		const setArray = jest.fn()

		await sortByBubble(arr, Direction.Descending, setArray)

		const sortedArr = arr.map(element => element.value)

		expect(sortedArr).toEqual([3, 2, 1])
	})
})

describe('сортировка выбором', () => {
	it('корректная сортировка пустого массива', () => {
		let result: ArrayElement[] = []
		const setArray = (arr: ArrayElement[]) => {
			result = arr
		}
		sortBySelection([], Direction.Ascending, setArray)

		expect(result).toBeInstanceOf(Array)
		expect(result).toHaveLength(0)
	})

	it('корректная сортировка массива с одним элементом', () => {
		let result: ArrayElement[] = []
		const setArray = (arr: ArrayElement[]) => {
			result = arr
		}
		sortBySelection(
			[{ value: 1, state: ElementStates.Default }],
			Direction.Ascending,
			setArray
		)

		expect(result).toEqual([{ value: 1, state: ElementStates.Default }])
	})

	it('корректная сортировка массива с несколькими элементами в порядке возрастания', async () => {
		const arr: ArrayElement[] = [
			{ value: 3, state: ElementStates.Default },
			{ value: 1, state: ElementStates.Default },
			{ value: 2, state: ElementStates.Default },
		]
		const setArray = jest.fn()

		await sortBySelection(arr, Direction.Ascending, setArray)

		const sortedArr = arr.map(element => element.value)

		expect(sortedArr).toEqual([1, 2, 3])
	})

	it('корректная сортировка массива с несколькими элементами в порядке убывания', async () => {
		const arr: ArrayElement[] = [
			{ value: 3, state: ElementStates.Default },
			{ value: 1, state: ElementStates.Default },
			{ value: 2, state: ElementStates.Default },
		]
		const setArray = jest.fn()

		await sortBySelection(arr, Direction.Descending, setArray)

		const sortedArr = arr.map(element => element.value)

		expect(sortedArr).toEqual([3, 2, 1])
	})
})
