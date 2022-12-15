import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Amount, { IAmountProps } from 'components/ui/Amount/Amount'

import { ICurrency, currencyInfo } from 'enums/currencyEnum'

describe('ui->Amount', () => {
	const currency: ICurrency = currencyInfo[0]

	const props: IAmountProps = {
		currentCurrency: currency,
		value: 0,
		label: 'Some label',
		onChangeValue: i => i
	}
	const renderComponent = () =>
		render(
			<Amount
				currentCurrency={props.currentCurrency}
				label={props.label}
				value={props.value}
				onChangeValue={props.onChangeValue}
			/>
		)

	it('should render without crash', async () => {
		const view: any = await renderComponent()
		expect(view.getByTestId('amount')).toBeInTheDocument()
	})

	it('should render provided currency symbol', async () => {
		const view: any = await renderComponent()
		expect(view.getByTestId('amount-currency-symbol')).toBeInTheDocument()
	})

	it('should render provided label', async () => {
		const view: any = await renderComponent()
		expect(view.queryByText('Some label')).toBeInTheDocument()
	})

	it('should render provided value as string with decimals in input', async () => {
		props.value = 50000.5112323
		const view: any = await renderComponent()
		const input = view.getByTestId('amount-input')
		expect(input).toBeInTheDocument()
		expect(input.value).toBe('50,000.51')
	})

	it('should render provided value as number in input', async () => {
		props.value = 100
		const view: any = await renderComponent()
		const input = view.getByTestId('amount-input')
		expect(input).toBeInTheDocument()
		expect(input.value).toBe('100.00')
	})
})
