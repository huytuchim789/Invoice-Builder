import { Card, CardContent } from '@mui/material'
import ParamsTable from './ParamsTable/ParamsTable'
import TableContent from './TableContent/TableContent'

const ListInvoiceContent = () => {
  return (
    <Card>
      <CardContent>
        <ParamsTable />
      </CardContent>
      <TableContent />
    </Card>
  )
}

export default ListInvoiceContent
