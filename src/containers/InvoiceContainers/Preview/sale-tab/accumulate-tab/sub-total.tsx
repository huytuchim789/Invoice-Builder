import { Grid, Typography } from '@mui/material'
import { useInvoiceAddStore } from '../../store'

export const SubTotal = () => {
  const { subTotal } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

  return (
    <Grid container alignItems='center' lg={12} justifyContent='space-between'>
      <Grid item lg={4} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          Subtotal:
        </Typography>
      </Grid>
      <Grid item lg={8} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          ${subTotal}
        </Typography>
      </Grid>
    </Grid>
  )
}
