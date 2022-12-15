import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import ReachDate, { IReachDateProps } from 'components/ui/ReachDate/ReachDate'

import { getCurrentDate } from 'helpers/getCurrentDate'
import { monthFormatter } from 'helpers/monthFormatter'

describe('ui->ReachDate', () => {
	const props: IReachDateProps = {
		label: 'Some label',
		changeNumberOfMonth: i => i
	}

	const renderComponent = () =>
		render(
			<ReachDate
				label={props.label}
				changeNumberOfMonth={props.changeNumberOfMonth}
			/>
		)

	it('should render without crash', async () => {
		const view = await renderComponent()
		expect(view.getByTestId('Reach-date')).toBeInTheDocument()
	})

	it('should render provided label', async () => {
		const view = await renderComponent()
		expect(view.getByText('Some label')).toBeInTheDocument()
	})

	it('should render date and year', async () => {
		const { currentMonth, currentYear } = getCurrentDate()
		const curMonth = monthFormatter(currentMonth) //string 'December'
		const view = await renderComponent()
		expect(view.getByTestId('date')).toHaveTextContent(
			`${curMonth}${currentYear}`
		)
	})
})
