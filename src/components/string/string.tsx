import React, { useState } from 'react'
import { DELAY_IN_MS } from '../../constants/delays'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './string.module.css'
import { getReverse } from './utils'

export const StringComponent: React.FC = () => {
	const [data, setData] = useState<{
		loading: boolean
		arr: string[]
		changing: number[]
		done: number[]
	}>({
		loading: false,
		arr: [],
		changing: [],
		done: [],
	})
	const [value, setValue] = useState<string>('')

	const reverse = async (string: string) => {
		const arr = getReverse(string)

		for (let i = 0; i < arr.length; i++) {
			setData(prev => ({ ...prev, ...arr[i] }))
			await delay(DELAY_IN_MS)
		}
	}

	const changingStatus = (index: number) => {
		if (data.done.includes(index)) return ElementStates.Modified
		if (data.changing.includes(index)) return ElementStates.Changing

		return ElementStates.Default
	}
	return (
		<SolutionLayout title='Строка'>
			<div className={styles.main}>
				<form
					onSubmit={e => {
						e.preventDefault()
						setData(prev => ({ ...prev, loading: true }))
						value &&
							reverse(value).then(() =>
								setData(prev => ({ ...prev, loading: false }))
							)
					}}
					className={styles.form}
				>
					<Input
						placeholder='Введите текст'
						isLimitText
						maxLength={11}
						onChange={e => setValue(e.currentTarget.value)}
					/>
					<Button
						type='submit'
						disabled={!value.length}
						text='Рассчитать'
						isLoader={data.loading}
					/>
				</form>
				<div className={styles.circles}>
					{data.arr.map((item, index) => (
						<Circle
							letter={item || ''}
							key={index}
							index={index}
							state={changingStatus(index)}
						/>
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}
