import { Card, CardContent } from '@mui/material'

import { ParamsTab } from './params-tab'
import dynamic from 'next/dynamic'

const ContentTab = dynamic<any>(() => import('./content-tab').then(mod => mod.ContentTab), {
  ssr: false
})
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
