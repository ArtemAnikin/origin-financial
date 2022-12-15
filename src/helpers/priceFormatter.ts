export const numberToPriceFormatter = (
	price: number,
	locales: string,
	currency: string
): string => {
	const rez = Intl.NumberFormat(locales, {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: 2,
		compactDisplay: 'short'
	}).format(price)
	if (rez.length > 14) {
		return rez.substring(0, 14) + '...'
	} else {
		return rez
	}
}

export const priceToNumber = (string: string): number => {
	return +string
		.replaceAll(',', '')
		.replace(/[a-z]/gi, '')
		.replace(/[,/;'[\]\\_\-=+|}{":?><!@#$%^&*()~`]/g, '')
		.replace(/^([^.]*\.)|\./g, '$1')
}

export const stringToPriceFormatter = (price: string): string => {
	return price
		.replace(/[^.\d+]/g, '')
		.replace(/[+]/g, '')
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		.replace(/^([^.]*\.)|\./g, '$1')
}

export const validatePrice = (stringValue: string): string => {
	if (stringValue && /^[^.]*$/.test(stringValue)) {
		return stringValue + '.00'
	} else if (/^\d+\.\d$/.test(stringValue)) {
		return stringValue + '0'
	} else if (/^\d+(\.\d{1,2})?$/.test(stringValue)) {
		return stringValue
	} else {
		const result = Number(stringValue.replaceAll(',', ''))
		return stringToPriceFormatter(result.toFixed(2))
	}
}
