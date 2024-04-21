import renderer from 'react-test-renderer'
import { ElementStates } from '../../../types/element-states'
import { Circle } from './circle'

it('корректный рендер элемента без буквы', () => {
	const tree = renderer.create(<Circle />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента с буквами', () => {
	const tree = renderer.create(<Circle letter='i' />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента с head', () => {
	const tree = renderer.create(<Circle head='i' />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента с react-элементом в head', () => {
	const tree = renderer.create(<Circle head={<></>} />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента с tail', () => {
	const tree = renderer.create(<Circle tail='i' />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента с react-элементом в tail', () => {
	const tree = renderer.create(<Circle tail={<></>} />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента с index', () => {
	const tree = renderer.create(<Circle index={1} />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента с пропом isSmall ===  true', () => {
	const tree = renderer.create(<Circle isSmall={true} />).toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента default', () => {
	const tree = renderer
		.create(<Circle state={ElementStates.Default} />)
		.toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента в состоянии changing', () => {
	const tree = renderer
		.create(<Circle state={ElementStates.Changing} />)
		.toJSON()
	expect(tree).toMatchSnapshot()
})

it('корректный рендер элемента в состоянии modified', () => {
	const tree = renderer
		.create(<Circle state={ElementStates.Modified} />)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
