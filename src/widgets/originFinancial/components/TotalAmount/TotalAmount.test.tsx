import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import TotalAmount, {
	ITotalAmountProps
} from 'widgets/originFinancial/components/TotalAmount/TotalAmount'

import { CURRENCY_ENUM, currencyInfo } from 'enums/currencyEnum'

import { getCurrentDate } from 'helpers/getCurrentDate'
import { monthFormatter } from 'helpers/monthFormatter'

describe('originFinancial - > TotalAmount', () => {
	let props: ITotalAmountProps = {
		currentCurrency: currencyInfo[CURRENCY_ENUM.USD],
		label: 'Some label',
		currentPrice: 0,
		numberOfMonth: 0
	}

	const renderComponent = () =>
		render(
			<TotalAmount
				currentCurrency={props.currentCurrency}
				label={props.label}
				currentPrice={props.currentPrice}
				numberOfMonth={props.numberOfMonth}
			/>
		)

	it('should render without crash', async () => {
		const view = await renderComponent()
		expect(view.getByTestId('TotalAmount')).toBeInTheDocument()
	})

	it('should render provided label in header', async () => {
		const view = await renderComponent()
		expect(view.getByText('Some label')).toBeInTheDocument()
	})

	it('should render provided currency symbol in header', async () => {
		props.currentCurrency = currencyInfo[CURRENCY_ENUM.EUR]
		const view = await renderComponent()
		expect(view.getByTestId('priceFormat')).toHaveTextContent('€0.00')
	})

	it('should render provided value as number in header', async () => {
		props.currentPrice = 100
		const view = await renderComponent()
		expect(view.getByTestId('priceFormat')).toHaveTextContent('100.00')
	})

	it('should render provided value as string with decimal in header', async () => {
		props.currentPrice = 50000.5112323
		const view = await renderComponent()
		expect(view.getByTestId('priceFormat')).toHaveTextContent('50,000.51')
	})

	it('should render price dived by number of month', async () => {
		props.currentPrice = 200
		props.numberOfMonth = 1
		const view = await renderComponent()
		expect(view.getByTestId('priceFormat')).toHaveTextContent('100.00')
	})

	it('should render number of month in info box', async () => {
		props.numberOfMonth = 5
		const view = await renderComponent()
		expect(view.getByTestId('info')).toHaveTextContent(
			'planning 5 monthly deposits'
		)
	})

	it('should render current price as string with decimal and current currency in info box', async () => {
		props.currentPrice = 10
		props.currentCurrency = currencyInfo[CURRENCY_ENUM.EUR]
		const view = await renderComponent()
		expect(view.getByTestId('info')).toHaveTextContent('your €10.00 goal')
	})

	it('should render month and year in info box', async () => {
		props.numberOfMonth = 0
		const { currentMonth, currentYear } = getCurrentDate()
		const curMonth = monthFormatter(currentMonth) //string 'December'
		const view = await renderComponent()
		expect(view.getByTestId('info')).toHaveTextContent(
			`${curMonth} ${currentYear}`
		)
	})
})
