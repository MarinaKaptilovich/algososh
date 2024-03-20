import React, { useState } from 'react'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { delay } from '../../utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './fibonacci-page.module.css'
import { getFibonacci } from './utils'

export const FibonacciPage: React.FC = () => {
	const [data, setData] = useState<{ loading: boolean; arr: number[] }>({
		loading: false,
		arr: [],
	})
	const [value, setValue] = useState<string>('')

	const getArr = async (number: number) => {
		for (let i = 0; i <= number; i++) {
			setData(prev => ({ ...prev, arr: getFibonacci(i + 1) }))
			await delay(SHORT_DELAY_IN_MS)
		}
	}
	return (
		<SolutionLayout title='Последовательность Фибоначчи'>
			<div className={styles.main}>
				<form
					onSubmit={e => {
						e.preventDefault()
						setData(prev => ({ ...prev, loading: true }))
						value &&
							getArr(parseInt(value)).then(() =>
								setData(prev => ({ ...prev, loading: false }))
							)
					}}
					className={styles.form}
				>
					<Input
						isLimitText
						placeholder='Введите число'
						type='number'
						min={1}
						max={19}
						value={value ?? ''}
						onChange={e => setValue(e.currentTarget.value)}
					/>
					<Button
						type='submit'
						text='Рассчитать'
						disabled={value === undefined}
						isLoader={data.loading}
					/>
				</form>
				<div className={styles.circles}>
					{data.arr.map((item, index) => (
						<Circle letter={String(item) || ''} key={index} index={index} />
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}
