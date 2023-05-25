import { Card, CardContent } from '@mui/material'

import { ContentTab } from './content-tab'
import { ParamsTab } from './params-tab'

export const TableTab = () => {
  return (
    <Card>
      <CardContent>
        <ParamsTab />
      </CardContent>
      <ContentTab />
    </Card>
  )
}
