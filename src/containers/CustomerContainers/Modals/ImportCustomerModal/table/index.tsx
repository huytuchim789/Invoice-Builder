import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { IBodyTable } from '..'

interface Props {
  tableHeader: string[]
  tableBody: IBodyTable[]
}

const CustomerTable = ({ tableHeader, tableBody }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader.map((head: string) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody.map(body => (
            <TableRow key={body.name}>
              <TableCell>{body.name}</TableCell>
              <TableCell>{body.company}</TableCell>
              <TableCell>{body.email}</TableCell>
              <TableCell>{body.country}</TableCell>
              <TableCell>{body.address}</TableCell>
              <TableCell>{body.contact_number}</TableCell>
              <TableCell>{body.contact_number_country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomerTable
