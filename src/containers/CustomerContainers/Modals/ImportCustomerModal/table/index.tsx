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
            <TableRow key={body['Name']}>
              <TableCell>{body['Name']}</TableCell>
              <TableCell>{body['Company']}</TableCell>
              <TableCell>{body['Email']}</TableCell>
              <TableCell>{body['Country']}</TableCell>
              <TableCell>{body['Address']}</TableCell>
              <TableCell>{body['Contact Number']}</TableCell>
              <TableCell>{body['Contact Number Country']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomerTable
