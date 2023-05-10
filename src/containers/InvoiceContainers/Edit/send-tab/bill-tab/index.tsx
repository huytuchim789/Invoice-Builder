import { Grid, Typography } from '@mui/material'
import { TotalDue } from './total-due'
import { BankName } from './bank-name'
import { Country } from './country'
import { Iban } from './iban'
import { SwiftCode } from './swift-code'

export const BillTab = () => {
  return (
    <>
      <Typography>Bill to</Typography>
      <Grid container columnGap={2} mt={2} color={'#808080'}>
        <TotalDue />
        <BankName />
        <Country />
        <Iban />
        <SwiftCode />
      </Grid>
    </>
  )
}
