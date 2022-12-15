import dollar from 'assets/dollar-sign.svg'

export interface ICurrency {
	image: string
	currency: string
	locales: string
}

export enum CURRENCY_ENUM {
	USD,
	EUR
}

type ICurrencyEnum = {
	[key in CURRENCY_ENUM]: ICurrency
}

export const currencyInfo: ICurrencyEnum = {
	[CURRENCY_ENUM.USD]: {
		image: dollar,
		currency: 'USD',
		locales: 'en-US'
	},
	[CURRENCY_ENUM.EUR]: {
		image: dollar,
		currency: 'EUR',
		locales: 'er-ER'
	}
}
