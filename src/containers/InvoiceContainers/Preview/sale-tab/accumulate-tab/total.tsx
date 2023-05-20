import { Grid, Typography } from '@mui/material'
import { useInvoiceAddStore } from '../../store'

export const Total = () => {
  const { subTotal } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      lg={12}
      style={{ borderTop: 1, borderColor: '#808080' }}
    >
      <Grid item lg={4} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          Total:
        </Typography>
      </Grid>
      <Grid item lg={8} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          ${subTotal + (subTotal * 21) / 100}
        </Typography>
      </Grid>
    </Grid>
  )
}
