import Payment from 'payment'
import DraftsIcon from '@mui/icons-material/Drafts'
import CircularProgress from '@mui/material/CircularProgress'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'

function clearNumber(value = '') {
  return value.replace(/\D+/g, '')
}

export function formatCreditCardNumber(value: string) {
  if (!value) {
    return value
  }

  const issuer = Payment.fns.cardType(value)
  const clearValue = clearNumber(value)
  let nextValue

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`
      break
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`
      break
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19
      )}`
      break
  }

  return nextValue.trim()
}

export function formatCVC(value: string, allValues: { number: number }) {
  const clearValue = clearNumber(value)
  let maxLength = 4

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number)
    maxLength = issuer === 'amex' ? 4 : 3
  }

  return clearValue.slice(0, maxLength)
}

export function formatExpirationDate(value: string) {
  const clearValue = clearNumber(value)

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
  }

  return clearValue
}

export const getStatusIcons = (status: string) => {
  switch (status) {
    case 'draft':
      return <DraftsIcon fontSize='small' />
      break
    case 'pending':
      return <CircularProgress size={16} />
      break
    case 'sent':
      return <MarkEmailReadIcon fontSize='small' />
      break
    case 'failed':
      return <SmsFailedIcon fontSize='small' />
      break
    default:
      return <DraftsIcon fontSize='small' />
  }
}

export const getSubTotalItem = (items: any) => {
  return items.reduce((acc: any, item: any) => {
    const valueStr = item.value ? item.value : '{}'
    const cost = JSON.parse(valueStr)

    return acc + Number(item.hours) * Number(cost.price ? cost.price : 0) * Number(item.cost)
  }, 0)
}

export const getItemsFormatData = (items: any) => {
  return items.map((item: any) => {
    const valueConvert = JSON.parse(item.value || '{}')

    return {
      ...item,
      name: valueConvert.name,
      price: valueConvert.price,
      quantity: item.cost,
      hours: item.hours,
      description: item.description,
      cost: valueConvert.price * item.hours
    }
  })
}
