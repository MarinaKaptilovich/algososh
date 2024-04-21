import { useState } from 'react'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils'

export class LinkedListNode<T> {
	value: T
	next: LinkedListNode<T> | null
	constructor(value: T, next?: LinkedListNode<T> | null) {
		this.value = value
		this.next = next === undefined ? null : next
	}
}

export class LinkedList<T> {
	private head: LinkedListNode<T> | null
	private size: number

	constructor() {
		this.head = null
		this.size = 0
	}

	addByIndex(element: T, index: number) {
		if (index < 0 || index > this.size) {
			throw new Error('Введите корректный индекс')
		} else {
			const node = new LinkedListNode(element)
			if (index === 0) {
				node.next = this.head
				this.head = node
			} else {
				let current = this.head
				let currIndex = 1

				while (currIndex < index) {
					current && (current = current.next)
					currIndex++
				}

				current && (node.next = current.next)
				current && (current.next = node)
			}

			this.size++
		}
	}

	deleteByIndex(index: number) {
		if (index < 0 || index > this.size) {
			throw new Error('Введите корректный индекс')
		}
		if (!this.head || index === 0) {
			return this.deleteHead()
		}
		let current = this.head
		for (let i = 0; i < index - 1 && current.next && current.next.next; i++) {
			current = current.next
		}
		current.next = current.next!.next
		this.size--
	}

	append(element: T) {
		const node = new LinkedListNode(element)
		if (this.head === null) {
			this.head = node
		} else {
			let current = this.head
			while (current.next) {
				current = current.next
			}
			current.next = node
		}
		this.size++
	}

	prepend(element: T) {
		const node = new LinkedListNode(element, this.head)
		this.head = node
		this.size++
	}

	deleteHead() {
		if (this.head === null) {
			return
		}
		this.head = this.head.next
		this.size--
	}

	deleteTail() {
		if (this.head === null) {
			return
		}
		if (this.size === 1) {
			this.deleteHead()
			return
		}
		let current = this.head
		while (current.next?.next) {
			current = current.next
		}
		current.next = null
		this.size--
	}

	getSize(): number {
		return this.size
	}

	list() {
		const arr: T[] = []
		let current = this.head
		current && arr.push(current.value)
		while (current?.next) {
			current = current.next
			arr.push(current.value)
		}
		return arr
	}

	clear() {
		this.head = null
		this.size = 0
	}
}

export type ListNode<T> = {
	letter: string
	state: ElementStates
	head?: string | Omit<ListNode<T>, 'head' | 'tail'>
	tail?: string | Omit<ListNode<T>, 'head' | 'tail'>
}

const changeLinkedList = <T>(
	item: T,
	index: number,
	array: T[]
): ListNode<T> => ({
	letter: String(item),
	state: ElementStates.Default,
	head: index === 0 ? 'Head' : undefined,
	tail: index === array.length - 1 ? 'Tail' : undefined,
})

export default function useList<T>(list: LinkedList<T>) {
	const [container, setContainer] = useState<ListNode<T>[]>(
		list.list().map(changeLinkedList)
	)

	const resetHeadTail = <T>(item: T, index: number, array: T[]) => ({
		...item,
		head: index === 0 ? 'Head' : undefined,
		tail: index === array.length - 1 ? 'Tail' : undefined,
	})

	const prepareDeleting = <T>(item: ListNode<T>): ListNode<T> => ({
		...item,
		letter: '',
		tail: { letter: item.letter, state: ElementStates.Changing },
		state: ElementStates.Changing,
	})

	const getDefault = (array: ListNode<T>[], ...index: number[]) => {
		return array.map((item, i) =>
			index.includes(i) ? { ...item, state: ElementStates.Default } : item
		)
	}

	const getChanging = (array: ListNode<T>[], ...index: number[]) => {
		return array.map((item, i) =>
			index.includes(i) ? { ...item, state: ElementStates.Changing } : item
		)
	}

	const getModified = (array: ListNode<T>[], ...index: number[]) => {
		return array.map((item, i) =>
			index.includes(i) ? { ...item, state: ElementStates.Modified } : item
		)
	}

	const addIndex = async (item: T, index: number) => {
		for (let i = 0; i < index; i++) {
			setContainer(prev =>
				getChanging(prev, i)
					.map(resetHeadTail)
					.map((value, index) =>
						index === i
							? {
									...value,
									head: { letter: String(item), state: ElementStates.Changing },
							  }
							: value
					)
			)
			await delay(SHORT_DELAY_IN_MS)
		}
		setContainer(prev =>
			prev.map(resetHeadTail).map((value, i) =>
				i === index
					? {
							...value,
							head: { letter: String(item), state: ElementStates.Changing },
					  }
					: value
			)
		)

		list.addByIndex(item, index)
		setContainer(getModified(list.list().map(changeLinkedList), index))
		await delay(SHORT_DELAY_IN_MS)
		setContainer(getDefault(list.list().map(changeLinkedList), index))
	}

	const deleteIndex = async (index: number) => {
		for (let i = 0; i < index; i++) {
			setContainer(prev => getChanging(prev, i))
			await delay(SHORT_DELAY_IN_MS)
		}
		setContainer(prev =>
			prev.map((value, i) => (i === index ? prepareDeleting(value) : value))
		)
		await delay(SHORT_DELAY_IN_MS)
		list.deleteByIndex(index)
		setContainer(list.list().map(changeLinkedList))
	}

	const append = async (item: T) => {
		setContainer(prev => [
			...prev.slice(0, -1),
			{
				...prev[prev.length - 1],
				head: {
					letter: String(item),
					state: ElementStates.Changing,
				},
			},
		])
		list.append(item)
		await delay(SHORT_DELAY_IN_MS)
		const array = list.list().map(changeLinkedList)
		setContainer(getModified(array, array.length - 1))
		await delay(SHORT_DELAY_IN_MS)
		setContainer(array)
	}

	const prepend = async (item: T) => {
		setContainer(([first, ...prev]) => [
			{
				...first,
				head: {
					letter: String(item),
					state: ElementStates.Changing,
				},
			},
			...prev,
		])
		list.prepend(item)
		await delay(SHORT_DELAY_IN_MS)
		const array = list.list().map(changeLinkedList)
		setContainer(getModified(array, 0))
		await delay(SHORT_DELAY_IN_MS)
		setContainer(array)
	}

	const deleteHead = async () => {
		setContainer(([first, ...prev]) => [prepareDeleting(first), ...prev])
		await delay(SHORT_DELAY_IN_MS)
		list.deleteHead()
		setContainer(list.list().map(changeLinkedList))
	}

	const deleteTail = async () => {
		setContainer(prev => [
			...prev.slice(0, -1),
			prepareDeleting(prev[prev.length - 1]),
		])
		await delay(SHORT_DELAY_IN_MS)
		list.deleteTail()
		setContainer(list.list().map(changeLinkedList))
	}

	const clear = () => {
		list.clear()
		setContainer(list.list().map(changeLinkedList))
	}

	return [
		container,
		{ addIndex, deleteIndex, append, prepend, deleteHead, deleteTail, clear },
	] as const
}
