import { DELAY_IN_MS } from '../../constants/delays'
import { Direction } from '../../types/direction'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils'

export type ArrayElement = {
	value: number
	state: ElementStates
}

export const getRandomArr = (): ArrayElement[] => {
	const arr: ArrayElement[] = []
	const length: number = Math.floor(Math.random() * 17) + 3
	for (let i = 0; i < length; i++) {
		arr.push({
			value: Math.floor(Math.random() * 100),
			state: ElementStates.Default,
		})
	}
	return arr
}

const swapElements = (
	arr: ArrayElement[],
	firstIndex: number,
	secondIndex: number
): void => {
	;[arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]]
}

export const sortByBubble = async (
	arr: ArrayElement[],
	direction: Direction,
	setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
) => {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			arr[j].state = arr[j + 1].state = ElementStates.Changing
			setArray([...arr])
			await delay(DELAY_IN_MS)

			if (
				(direction === Direction.Ascending &&
					arr[j].value > arr[j + 1].value) ||
				(direction === Direction.Descending && arr[j].value < arr[j + 1].value)
			) {
				swapElements(arr, j, j + 1)
			}

			arr[j].state = arr[j + 1].state = ElementStates.Default
			setArray([...arr])
		}

		arr[arr.length - i - 1].state = ElementStates.Modified
		setArray([...arr])
	}
}

export const sortBySelection = async (
	arr: Array<ArrayElement>,
	direction: Direction,
	setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>
): Promise<void> => {
	for (let i = 0; i < arr.length - 1; i++) {
		let min = i
		for (let j = i + 1; j < arr.length; j++) {
			arr[i].state = arr[j].state = ElementStates.Changing
			setArray([...arr])
			await delay(DELAY_IN_MS)

			if (
				(direction === Direction.Ascending && arr[j].value < arr[min].value) ||
				(direction === Direction.Descending && arr[j].value > arr[min].value)
			) {
				min = j
			}

			arr[j].state = ElementStates.Default
			setArray([...arr])
		}

		swapElements(arr, i, min)
		arr[i].state = ElementStates.Modified
		setArray([...arr])
	}
	arr[arr.length - 1].state = ElementStates.Modified
	setArray([...arr])
}
