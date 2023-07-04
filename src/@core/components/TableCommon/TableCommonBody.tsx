import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { ChangeEvent, useContext } from 'react'
import { ITableCommon, TableCommonContext } from './TableCommon'
import { useTableMutilCheckStore } from './store'

const TableCommonBody = () => {
  const { headerData, data, checkable } = useContext(TableCommonContext) as ITableCommon
  const { checkedSelected, setCheckedSelected } = useTableMutilCheckStore()

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedSelected(event.target.value, event.target.checked)
  }

  return (
    <TableBody>
      {data.map(dataBody => (
        <TableRow key={dataBody.id}>
          {checkable && (
            <TableCell width={50}>
              <Checkbox
                value={JSON.stringify({ invoice_id: dataBody?.invoice_id, method: dataBody?.method })}
                checked={checkedSelected.includes(
                  JSON.stringify({ invoice_id: dataBody?.invoice_id, method: dataBody?.method })
                )}
                onChange={handleCheck}
              />
            </TableCell>
          )}
          {headerData.map(head => {
            const { field, width, customStyle, component } = head

            return (
              <TableCell
                key={field}
                style={{
                  width: width ?? 'fit-content',
                  ...customStyle
                }}
              >
                {component ? component(dataBody) : dataBody[head.field]}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableCommonBody
