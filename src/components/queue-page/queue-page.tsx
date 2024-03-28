import React, { useState } from 'react'
import { ElementStates } from '../../types/element-states'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './queue-page.module.css'
import useQueue, { Queue } from './utils'

let queue = new Queue<string>()

export const QueuePage: React.FC = () => {
	const [value, setValue] = useState('')
	const [{ arr, changing, head, tail }, { enqueue, dequeue, clear }] =
		useQueue<string>(queue)
	const [button, setButton] = useState({
		add: 'active',
		delete: 'active',
		clear: 'active',
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setButton({
			add: 'loading',
			delete: 'disabled',
			clear: 'disabled',
		})
		enqueue(value).then(() =>
			setButton({
				add: 'active',
				delete: 'active',
				clear: 'active',
			})
		)
		setValue('')
	}

	const handleDequeue = () => {
		setButton({
			add: 'disabled',
			delete: 'loading',
			clear: 'disabled',
		})
		dequeue().then(() =>
			setButton({
				add: 'active',
				delete: 'active',
				clear: 'active',
			})
		)
	}

	return (
		<SolutionLayout title='Очередь'>
			<main className={styles.main}>
				<div className={styles.container}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Input
							value={value}
							placeholder='Введите текст'
							type='text'
							maxLength={4}
							isLimitText
							extraClass={styles.input}
							onChange={e => setValue(e.currentTarget.value)}
						/>
						<Button
							type='submit'
							text='Добавить'
							isLoader={button.add === 'loading'}
							disabled={
								queue.isFull() || button.add === 'disabled' || queue.tail === 7
							}
						/>
						<Button
							type='button'
							text='Удалить'
							onClick={handleDequeue}
							isLoader={button.delete === 'loading'}
							disabled={queue.isEmpty() || button.delete === 'disabled'}
						/>
					</form>

					<Button
						type='button'
						text='Очистить'
						onClick={clear}
						disabled={queue.isEmpty() || button.clear === 'disabled'}
					/>
				</div>
				<ul className={styles.circles}>
					{arr.map((item, index, arr) => {
						return (
							<Circle
								letter={item || ''}
								key={index}
								head={index === head ? 'head' : ''}
								tail={
									index + 1 === tail ||
									(item && index === arr.length - 1 && tail === 0)
										? 'tail'
										: ''
								}
								index={index}
								state={
									changing === index
										? ElementStates.Changing
										: ElementStates.Default
								}
							/>
						)
					})}
				</ul>
			</main>
		</SolutionLayout>
	)
}
