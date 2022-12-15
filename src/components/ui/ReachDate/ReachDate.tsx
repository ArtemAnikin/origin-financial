import React, { FC, memo, useEffect, useRef, useState } from 'react'

import { getCurrentDate } from 'helpers/getCurrentDate'
import { monthFormatter } from 'helpers/monthFormatter'

import leftArrow from 'assets/arrow-left.svg'
import rightArrow from 'assets/arrow-right.svg'

import styles from './ReachDate.module.scss'

export interface IReachDateProps {
	label: string
	changeNumberOfMonth: (month: number) => void
}

const ReachDate: FC<IReachDateProps> = ({ changeNumberOfMonth, label }) => {
	const { currentYear, currentMonth } = getCurrentDate()

	const [month, setMonth] = useState(currentMonth)
	const [year, setYear] = useState(currentYear)

	const wrapperRef = useRef<HTMLDivElement>(null)
	const leftArrowBtn = useRef<HTMLButtonElement>(null)
	const rightArrowBtn = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const refWrapper = wrapperRef.current
		const handlerArrows = (event: any) => {
			switch (event.key) {
				case 'ArrowRight':
					rightArrowBtn.current?.click()
					break
				case 'ArrowLeft':
					leftArrowBtn.current?.click()
					break
			}
		}

		refWrapper?.addEventListener('keydown', handlerArrows)

		return () => {
			refWrapper?.removeEventListener('keydown', handlerArrows)
		}
	}, [month, wrapperRef])

	const handleMonthInc = (): void => {
		changeMonth(12, 1)
	}

	const handleMonthDec = (): void => {
		if (currentYear !== year || currentMonth !== month) {
			changeMonth(1, -1)
		}
	}

	const changeMonth = (condition: number, value: number): void => {
		if (month === condition) {
			setYear(year + value)
			setMonth(condition === 12 ? 1 : 12)
		} else {
			setMonth(month + value)
		}
		changeNumberOfMonth(value)
	}

	return (
		<>
			<div className={styles.title} data-testid='label'>
				{label}
			</div>
			<div
				className={styles.wrapper}
				ref={wrapperRef}
				data-testid='Reach-date'
				tabIndex={0}
			>
				<button
					className={styles.leftArrowButton}
					ref={leftArrowBtn}
					onClick={() => handleMonthDec()}
				>
					<img src={leftArrow} alt='left arrow' />
				</button>
				<div className={styles.date} data-testid='date'>
					<p>{monthFormatter(month)}</p>
					<p className={styles.year}>{year}</p>
				</div>
				<button
					className={styles.rightArrowButton}
					ref={rightArrowBtn}
					onClick={() => handleMonthInc()}
				>
					<img src={rightArrow} alt='right arrow' />
				</button>
			</div>
		</>
	)
}

export default memo(ReachDate)
