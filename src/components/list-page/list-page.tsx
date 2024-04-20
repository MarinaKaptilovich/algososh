import React, { useState } from 'react'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './list-page.module.css'
import useList, { LinkedList, ListNode } from './utils'

const linkedList = new LinkedList<String>()

function getHeadOrTail<T>(item?: string | Omit<ListNode<T>, 'head' | 'tail'>) {
	if (typeof item === 'undefined') return undefined
	return typeof item === 'string' ? item : <Circle {...item} isSmall />
}

export const ListPage: React.FC = () => {
	const [value, setValue] = useState('')
	const [indexValue, setIndexValue] = useState<number>()
	const [loading, setLoading] = useState({
		addIndex: false,
		deleteIndex: false,
		addHead: false,
		deleteHead: false,
		addTail: false,
		deleteTail: false,
	})

	const [
		list,
		{ addIndex, deleteIndex, append, prepend, deleteHead, deleteTail },
	] = useList(linkedList)

	const handleAddByIndex = () => {
		setLoading(prev => ({ ...prev, addIndex: true }))
		addIndex(value, indexValue || 0).then(() =>
			setLoading(prev => ({ ...prev, addIndex: false }))
		)
		setIndexValue(parseInt(''))
		setValue('')
	}

	const handleDeleteByIndex = () => {
		setLoading(prev => ({ ...prev, deleteIndex: true }))
		deleteIndex(indexValue || 0).then(() =>
			setLoading(prev => ({ ...prev, deleteIndex: false }))
		)
		setIndexValue(parseInt(''))
	}

	const handleAddTail = () => {
		setLoading(prev => ({ ...prev, addTail: true }))
		append(value).then(() => setLoading(prev => ({ ...prev, addTail: false })))
		setValue('')
	}

	const handleAddHead = () => {
		setLoading(prev => ({ ...prev, addHead: true }))
		prepend(value).then(() => setLoading(prev => ({ ...prev, addHead: false })))
		setValue('')
	}

	const handleDeleteHead = () => {
		setLoading(prev => ({ ...prev, deleteHead: true }))
		deleteHead().then(() =>
			setLoading(prev => ({ ...prev, deleteHead: false }))
		)
	}

	const handleDeleteTail = () => {
		setLoading(prev => ({ ...prev, deleteTail: true }))
		deleteTail().then(() =>
			setLoading(prev => ({ ...prev, deleteTail: false }))
		)
	}
	return (
		<SolutionLayout title='Связный список'>
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.input_container}>
						<Input
							value={value}
							id='value'
							placeholder='Введите текст'
							type='text'
							maxLength={4}
							isLimitText={true}
							extraClass={styles.text_input}
							onChange={e => setValue(e.currentTarget.value)}
						/>
						<Button
							type='button'
							id='adding'
							text='Добавить в head'
							onClick={handleAddHead}
							isLoader={loading.addHead}
							disabled={!value}
						/>
						<Button
							type='button'
							id='adding'
							text='Добавить в tail'
							onClick={handleAddTail}
							isLoader={loading.addTail}
							disabled={!value}
						/>
						<Button
							type='button'
							id='deleting'
							text='Удалить из head'
							onClick={handleDeleteHead}
							isLoader={loading.deleteHead}
							disabled={!list.length}
						/>
						<Button
							type='button'
							id='deleting'
							text='Удалить из tail'
							onClick={handleDeleteTail}
							isLoader={loading.deleteTail}
							disabled={!list.length}
						/>
					</div>
					<div className={styles.input_container}>
						<Input
							value={indexValue}
							id='index'
							placeholder='Введите индекс'
							type='number'
							min={0}
							max={list.length - 1}
							extraClass={styles.text_input}
							onChange={e => setIndexValue(parseInt(e.currentTarget.value))}
						/>
						<Button
							type='button'
							id='indexActions'
							text='Добавить по индексу'
							extraClass={styles.flex_grow}
							onClick={handleAddByIndex}
							isLoader={loading.addIndex}
							disabled={!list.length || !indexValue}
						/>
						<Button
							type='button'
							id='indexActions'
							text='Удалить по индексу'
							extraClass={styles.flex_grow}
							onClick={handleDeleteByIndex}
							isLoader={loading.deleteIndex}
							disabled={!list.length || !indexValue}
						/>
					</div>
					<div className={styles.circles}>
						{list.map((item, index, arr) => (
							<div className={styles.circles} key={index}>
								<Circle
									{...item}
									head={getHeadOrTail(item.head)}
									tail={getHeadOrTail(item.tail)}
									index={index}
								/>
							</div>
						))}
					</div>
				</div>
			</main>
		</SolutionLayout>
	)
}
