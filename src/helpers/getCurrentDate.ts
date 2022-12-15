interface ICurrentDate {
	currentMonth: number
	currentYear: number
}

export const getCurrentDate = (): ICurrentDate => {
	const today = new Date()
	return {
		currentMonth: today.getMonth() + 1, //January is 0!
		currentYear: today.getFullYear()
	}
}
