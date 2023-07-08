import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

import extendedDayJs from 'src/@core/utils/dayjs'
import { useListInvoiceStore } from '../store'

const RangeDateSelect = () => {
  const { setRangeDate } = useListInvoiceStore((state: any) => state.rangeDateStore)

  const handleChangeDate = (date: any) => {
    if (date[0] && date[1]) {
      setRangeDate([extendedDayJs(date[0]).format('YYYY-MM-DD'), extendedDayJs(date[1]).format('YYYY-MM-DD')])
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
