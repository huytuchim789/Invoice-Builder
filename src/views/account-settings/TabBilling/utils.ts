import moment from 'moment'

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

export const timestampzToDate = (timestampz: string | undefined) => {
  if (!timestampz) return null
  return moment(timestampz).format('MMM DD, YYYY')
}
export function calculateDaysLeft(targetDate: string | undefined) {
  if (!targetDate) return MONTH_DATE
  const currentDate = moment()
  const targetDateObj = moment(targetDate)

  const daysLeft = targetDateObj.diff(currentDate, 'days')

  return daysLeft
}

export const MONTH_DATE = 30
