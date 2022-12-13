import { FC } from 'react'

import Button from 'components/ui/Button/Button'

import houseImg from 'assets/icons/buy-a-house.svg'

import styles from './OriginFinancial.module.scss'

const OriginFinancialWidget: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<img src={houseImg} alt='HouseImg' />
				<div className={styles.title}>
					<div>Buy a house</div>
					<div className={styles.title2}>Saving goal</div>
				</div>
			</div>

			<div className={styles.submit}>
				<Button>Confirm</Button>
			</div>
		</div>
	)
}

export default OriginFinancialWidget
