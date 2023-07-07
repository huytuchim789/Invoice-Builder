import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

import { useRouter } from 'next/router'

import extendedDayJs from 'src/@core/utils/dayjs'
import { useRangeDateStore } from './store'

const RangeDateSelect = () => {
  const router = useRouter()
  const { setRangeDate } = useRangeDateStore()

  const handleChangeDate = (date: any) => {
    if (date[0] && date[1]) {
      setRangeDate([extendedDayJs(date[0]).format('YYYY-MM-DD'), extendedDayJs(date[1]).format('YYYY-MM-DD')])
      router.push({
        pathname: '/invoice/list',
        query: {
          ...router.query,
          startDate: extendedDayJs(date[0]).format('YYYY-MM-DD'),
          endDate: extendedDayJs(date[1]).format('YYYY-MM-DD')
        }
      })
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker onChange={handleChangeDate} localeText={{ start: 'Check-in', end: 'Check-out' }} />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default RangeDateSelect
