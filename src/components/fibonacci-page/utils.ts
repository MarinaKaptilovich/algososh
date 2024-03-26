const calculateFibonacci = (number: number, cache: number[] = []): number => {
	const newCache = [...cache]

	if (newCache[number]) {
		return newCache[number]
	}

	if (number <= 2) {
		return 1
	}

	newCache[number] =
		calculateFibonacci(number - 1, newCache) +
		calculateFibonacci(number - 2, newCache)

	return newCache[number]
}

export const getFibonacci = (length: number) =>
	Array.from({ length }, (_, index) => calculateFibonacci(index + 1))
