import React, { FC, memo, useState } from 'react'

import { ICurrency } from 'enums/currencyEnum'

import {
	priceToNumber,
	stringToPriceFormatter,
	validatePrice
} from 'helpers/priceFormatter'

import styles from './Amount.module.scss'

export interface IAmountProps {
	value: number
	label: string
	currentCurrency: ICurrency
	onChangeValue: (value: number) => void
}

const Amount: FC<IAmountProps> = ({
	currentCurrency,
	value,
	onChangeValue,
	label
}) => {
	const price = validatePrice(String(value))
	const [stringValue, setStringValue] = useState(price)
	//const currency = currencyInfo.

	const onBlur = (): void => {
		setStringValue(validatePrice(stringValue))
	}

	const changeValue = (event: any): void => {
		const rez = event.target.value.replaceAll(',', '')

		//only 2 numbers after '.'
		if (/^(\d?)+(\.?)+(\d{1,2})?$/.test(rez)) {
			setStringValue(stringToPriceFormatter(rez))
			onChangeValue(priceToNumber(rez))
		}
	}

	return (
		<>
			<div className={styles.title}>{label}</div>
			<div className={styles.wrapper} data-testid='amount'>
				<img
					src={currentCurrency.image}
					alt=''
					data-testid='amount-currency-symbol'
				/>
				<input
					onBlur={onBlur}
					className={styles.input}
					type='text'
					data-testid='amount-input'
					placeholder='0.00'
					onChange={event => changeValue(event)}
					value={stringValue}
				/>
			</div>
		</>
	)
}

export default memo(Amount)
