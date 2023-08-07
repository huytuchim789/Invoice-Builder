import { Card, CardContent, Grid } from '@mui/material'

import InvoiceStatusFilter from './InvoiceStatusSelect'
import RangeDateSelect from './RangeDateSelect'

const FilterSelectContent = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item lg={6} md={6} sm={12}>
            <InvoiceStatusFilter />
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <RangeDateSelect />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FilterSelectContent
