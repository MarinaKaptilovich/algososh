import React, { useState } from 'react'
import { ElementStates } from '../../types/element-states'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './stack-page.module.css'
import useStack, { Stack } from './utils'

const stack = new Stack<string>()

export const StackPage: React.FC = () => {
	const [value, setValue] = useState('')
	const [{ arr, top }, { pop, push, clear }] = useStack<string>(stack)
	const [loading, setLoading] = useState({ adding: false, deleting: false })

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(prev => ({ ...prev, adding: true }))
		push(value).then(() => setLoading(prev => ({ ...prev, adding: false })))
		setValue('')
	}

	const handleDeleteButton = () => {
		setLoading(prev => ({ ...prev, deleting: true }))
		pop().then(() => setLoading(prev => ({ ...prev, deleting: false })))
	}
	return (
		<SolutionLayout title='Стек'>
			<main className={styles.main}>
				<div className={styles.container}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Input
							value={value}
							placeholder='Введите текст'
							type='text'
							maxLength={4}
							isLimitText={true}
							extraClass={styles.input}
							onChange={e => setValue(e.currentTarget.value)}
						/>
						<Button
							type='submit'
							text='Добавить'
							isLoader={loading.adding}
							disabled={!value.length}
						/>
						<Button
							type='button'
							text='Удалить'
							onClick={handleDeleteButton}
							disabled={!arr.filter(item => item).length}
							isLoader={loading.deleting}
						/>
					</form>
					<Button
						type='button'
						text='Очистить'
						onClick={clear}
						disabled={!arr.filter(item => item).length}
					/>
				</div>
				<ul className={styles.circles}>
					{arr.map((item, index, arr) => (
						<Circle
							letter={item || ''}
							key={index}
							index={index}
							state={
								top === index ? ElementStates.Changing : ElementStates.Default
							}
						/>
					))}
				</ul>
			</main>
		</SolutionLayout>
	)
}
