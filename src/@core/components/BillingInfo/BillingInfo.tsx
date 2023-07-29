import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  objectFit: 'cover',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))
const BillingInfo = ({ imgUrl }: { imgUrl: string }) => {
  return imgUrl ? <ImgStyled src={imgUrl} /> : <></>
}

export default BillingInfo
