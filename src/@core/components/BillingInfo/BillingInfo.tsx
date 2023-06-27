import { Box, Grid, Typography } from '@mui/material'

interface Props {
  title: string
  content: string
  style?: React.CSSProperties
}

const GridBill = ({ title, content, ...props }: Props) => {
  return (
    <Grid container alignItems='center' justifyContent='space-between' {...props}>
      <Grid item lg={4} md={4} sm={4}>
        <Typography fontSize={14} color={'#808080'}>
          {title}:
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8}>
        <Typography fontSize={14} color={'#808080'} textAlign='right'>
          {content}
        </Typography>
      </Grid>
    </Grid>
  )
}

const BillingInfo = () => {
  return (
    <Box>
      <Typography>Bill to</Typography>
      <GridBill title='Total Due' content='$ 12,110.55' />
      <GridBill title='Bank name' content='American Bank' />
      <GridBill title='Country' content='United States' />
      <GridBill title='IBAN' content='ETD95476213874685' />
      <GridBill title='SWIFT code' content='BR91905' />
    </Box>
  )
}

export default BillingInfo
