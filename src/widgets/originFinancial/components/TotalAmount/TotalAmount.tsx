import { FC } from 'react'

import { ICurrency } from 'enums/currencyEnum'

import { getCurrentDate } from 'helpers/getCurrentDate'
import { monthFormatter } from 'helpers/monthFormatter'
import { numberToPriceFormatter } from 'helpers/priceFormatter'

import styles from './TotalAmount.module.scss'

export interface ITotalAmountProps {
	label: string
	currentCurrency: ICurrency
	currentPrice: number
	numberOfMonth: number
}

const TotalAmount: FC<ITotalAmountProps> = ({
	currentPrice,
	numberOfMonth,
	currentCurrency,
	label
}) => {
	const { currency, locales } = currentCurrency
	const { currentMonth, currentYear } = getCurrentDate()

	const month = (currentMonth + numberOfMonth) % 12

	const year = currentYear + Math.trunc((currentMonth - 1 + numberOfMonth) / 12)

	const price = currentPrice / (numberOfMonth + 1)

	return (
		<div className={styles.wrapper} data-testid='TotalAmount'>
			<div className={styles.header}>
				<div className={styles.title} data-testid='label'>
					{label}
				</div>
				<div className={styles.price} data-testid='priceFormat'>
					{numberToPriceFormatter(price, locales, currency)}
				</div>
			</div>
			<div className={styles.info} data-testid='info'>
				You’re planning <strong> {numberOfMonth} monthly deposits </strong> to reach
				your
				<strong>
					{' '}
					{numberToPriceFormatter(currentPrice, locales, currency)}{' '}
				</strong>{' '}
				goal by
				<strong>
					{' '}
					{monthFormatter(month)} {year}
				</strong>
			</div>
		</div>
	)
}

export default TotalAmount
