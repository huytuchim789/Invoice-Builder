import { Card, CardContent, Grid } from '@mui/material'

import { InvoiceStatusFilter } from './status-tab'
import dynamic from 'next/dynamic'

const RangeDateTab = dynamic<any>(() => import('./range-date-tab').then(mod => mod.RangeDateTab), {
  ssr: false
})

export const FilterTab = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12}>
            <InvoiceStatusFilter />
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <RangeDateTab />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
