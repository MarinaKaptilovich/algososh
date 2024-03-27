import { useState } from 'react'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { delay } from '../../utils'

export class Queue<T> {
	private container: (T | null)[]
	private head = 0
	private tail = 0
	private length: number = 0

	constructor(private size: number = 7) {
		this.size = size
		this.container = Array(size).fill(null)
	}

	enqueue(item: T): void {
		if (!item) return
		if (this.length >= this.size)
			throw new Error('Достигнуто максимальное количество элементов массива')

		this.container[this.tail % this.size] = item
		this.length++
		this.tail = (this.tail + 1) % this.size
	}

	dequeue(): void {
		if (this.length === 0) return
		this.container[this.head] = null
		this.length--
		this.head = (this.head + 1) % this.size
	}

	getHead(): number {
		return this.head
	}

	getTail(): number {
		return this.tail
	}

	list(): (T | null)[] {
		return this.container.slice()
	}

	isFull() {
		return this.length >= this.size
	}

	isEmpty() {
		return this.length === 0
	}

	clear(): void {
		this.head = 0
		this.tail = 0
		this.length = 0
		this.container = Array(this.size).fill(null)
	}
}

export default function useQueue<T>(queue: Queue<T>) {
	const [container, setContainer] = useState({
		arr: queue.list(),
		head: queue.getHead(),
		tail: queue.getTail(),
		changing: -1,
	})

	const getChanging = (index: number) =>
		setContainer(prev => ({ ...prev, changing: index }))

	const enqueue = async (item: T) => {
		getChanging(container.tail)
		await delay(SHORT_DELAY_IN_MS)
		queue.enqueue(item)
		setContainer(prev => ({
			...prev,
			arr: queue.list(),
			changing: -1,
			tail: queue.getTail(),
		}))
	}

	const dequeue = async () => {
		getChanging(container.head)
		await delay(SHORT_DELAY_IN_MS)
		queue.dequeue()
		setContainer(prev => ({
			...prev,
			arr: queue.list(),
			changing: -1,
			head: queue.getHead(),
		}))
	}

	const clear = () => {
		queue.clear()
		setContainer({
			arr: queue.list(),
			head: queue.getHead(),
			tail: queue.getTail(),
			changing: -1,
		})
	}
	return [container, { enqueue, dequeue, clear }] as const
}
