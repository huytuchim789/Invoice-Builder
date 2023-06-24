import { Grid, Box, SelectChangeEvent, Typography } from '@mui/material'

import BillingInfo from 'src/@core/components/BillingInfo/BillingInfo'
import UserInfoSelect from 'src/@core/components/UserInfoSelect/UserInfoSelect'
import UserInfo from 'src/@core/components/UserInfoSelect/UserInfo'

import { useInvoiceAddStore } from '../store'

const InvoiceTo = () => {
  const { user, setUser } = useInvoiceAddStore((state: any) => state.userSelectTabStore)

  const handleChangeUserSelect = (event: SelectChangeEvent<string>) => {
    if (event.target.value !== '') {
      setUser(JSON.parse(event.target.value))
    }
  }

  return (
    <Box padding={3} borderColor='#808080' borderTop={1} mt={2}>
      <Grid container justifyContent={'space-between'}>
        <Grid item sm={4} md={4} lg={4}>
          <Typography>Invoice To:</Typography>
          <UserInfoSelect defaultValue='' handleChangeUserSelect={handleChangeUserSelect} hasModal={true} />
          <UserInfo user={user} />
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <BillingInfo />
        </Grid>
      </Grid>
    </Box>
  )
}

export default InvoiceTo
