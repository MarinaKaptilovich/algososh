type Reverse = { arr: string[]; changing: number[]; done: number[] }

export const getReverse = (string: string): Reverse[] => {
	const arr: string[] = string.split('')
	const reversed: Reverse[] = [{ arr: arr.slice(), changing: [], done: [] }]

	for (let i = 0; i < arr.length / 2; i++) {
		const secondIndex: number = string.length - i - 1
		reversed.push({
			...reversed[reversed.length - 1],
			changing: [i, secondIndex],
		})

		const temp = arr[secondIndex]
		arr[secondIndex] = arr[i]
		arr[i] = temp

		reversed.push({
			...reversed[reversed.length - 1],
			arr: arr.slice(),
			done: reversed[reversed.length - 1].done.concat([i, secondIndex]),
		})
	}
	return reversed
}
