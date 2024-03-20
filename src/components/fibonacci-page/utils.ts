const calculateFibonacci = (number: number, cache: number[] = []): number => {
	if (cache[number]) {
		return cache[number]
	}
	if (number <= 2) {
		return 1
	}

	cache[number] =
		calculateFibonacci(number - 1, cache) +
		calculateFibonacci(number - 2, cache)

	return cache[number]
}

export const getFibonacci = (length: number) =>
	Array.from({ length }, (_, index) => calculateFibonacci(index + 1))
