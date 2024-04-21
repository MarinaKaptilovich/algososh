import React, { useCallback, useState } from 'react'
import { Direction } from '../../types/direction'
import { Button as ButtonType } from '../ui/button/button'
import { Column } from '../ui/column/column'
import { RadioInput } from '../ui/radio-input/radio-input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './sorting-page.module.css'
import {
	ArrayElement,
	getRandomArr,
	sortByBubble,
	sortBySelection,
} from './utils'

type Sort = 'bubble' | 'selection'

export const SortingPage: React.FC = () => {
	const [array, setArray] = useState<ArrayElement[]>(getRandomArr())
	const [type, setType] = useState<Sort>('selection')
	const [button, setButton] = useState({
		ascending: 'active',
		descending: 'active',
		generateArray: 'active',
	})

	const sortArr = useCallback(
		(sort: Sort, direction: Direction) => {
			return sort === 'bubble'
				? sortByBubble(array, direction, setArray)
				: sortBySelection(array, direction, setArray)
		},
		[array, setArray]
	)

	const handleAscBtn = useCallback(() => {
		setButton({
			ascending: 'loading',
			descending: 'disabled',
			generateArray: 'disabled',
		})
		sortArr(type, Direction.Ascending).finally(() =>
			setButton({
				ascending: 'active',
				descending: 'active',
				generateArray: 'active',
			})
		)
	}, [sortArr, type])

	const handleDescBtn = useCallback(() => {
		setButton({
			ascending: 'disabled',
			descending: 'loading',
			generateArray: 'disabled',
		})
		sortArr(type, Direction.Descending).finally(() =>
			setButton({
				ascending: 'active',
				descending: 'active',
				generateArray: 'active',
			})
		)
	}, [sortArr, type])

	const handleGenerateArr = useCallback(() => {
		setArray(getRandomArr())
	}, [])

	return (
		<SolutionLayout title='Сортировка массива'>
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.buttons}>
						<div className={styles.radio_buttons}>
							<RadioInput
								label='Выбор'
								checked={type === 'selection'}
								onChange={() => setType('selection')}
							/>
							<RadioInput
								label='Пузырек'
								checked={type === 'bubble'}
								onChange={() => setType('bubble')}
							/>
						</div>
						<div className={styles.sort_buttons}>
							<ButtonType
								text='По возрастанию'
								type='button'
								sorting={Direction.Ascending}
								onClick={handleAscBtn}
								isLoader={button.ascending === 'loading'}
								disabled={button.descending === 'disabled'}
							/>
							<ButtonType
								text='По убыванию'
								type='button'
								sorting={Direction.Ascending}
								onClick={handleDescBtn}
								isLoader={button.descending === 'loading'}
								disabled={button.descending === 'disabled'}
							/>
						</div>
						<ButtonType
							text='Новый массив'
							type='button'
							onClick={handleGenerateArr}
							disabled={button.generateArray === 'disabled'}
						/>
					</div>
					<div className={styles.array}>
						{array &&
							array.map((item, index: number) => (
								<Column index={item.value} key={index} state={item.state} />
							))}
					</div>
				</div>
			</main>
		</SolutionLayout>
	)
}
