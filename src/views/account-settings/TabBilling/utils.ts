export function getFullYearByLastTwoDigits(dateString: string) {
  const currentYear = new Date().getFullYear()

  const [month, year] = dateString.split('/')

  const fullYear = Number(year) + Math.floor(currentYear / 100) * 100

  if (fullYear <= currentYear) {
    return { exp_month: month.padStart(2, '0'), exp_year: fullYear.toString() }
  } else {
    return { exp_month: month.padStart(2, '0'), exp_year: fullYear.toString() }
  }
}
