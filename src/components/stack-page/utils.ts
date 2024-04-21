import { useState } from 'react'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { delay } from '../../utils'

export class Stack<T> {
	private container: (T | undefined)[] = []
	private top = -1

	constructor() {
		this.container = []
	}

	pop = (): T | undefined => {
		if (this.top < 0) return
		this.top--
		return this.container.pop()
	}

	push = (item: T): void => {
		if (!item) return
		this.top++
		this.container.push(item)
	}

	getTop = (): number => this.top

	getSize = (): number => this.container.length

	list = (): (T | undefined)[] => this.container.slice()

	clear = (): void => {
		this.container = []
		this.top = -1
	}
}

export default function useStack<T>(stack: Stack<T>) {
	const [container, setContainer] = useState({
		arr: stack.list(),
		top: -1,
	})

	const pop = async () => {
		stack.pop()
		setContainer({
			top: stack.getTop(),
			arr: stack.list(),
		})
		await delay(SHORT_DELAY_IN_MS)
		setContainer({
			top: -1,
			arr: stack.list(),
		})
	}

	const push = async (item: T) => {
		stack.push(item)
		setContainer({
			top: stack.getTop(),
			arr: stack.list(),
		})
		await delay(SHORT_DELAY_IN_MS)
		setContainer({
			top: -1,
			arr: stack.list(),
		})
	}

	const clear = () => {
		stack.clear()
		setContainer({
			top: -1,
			arr: stack.list(),
		})
	}

	return [container, { pop, push, clear }] as const
}
