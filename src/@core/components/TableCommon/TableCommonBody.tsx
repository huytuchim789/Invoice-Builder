import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { ChangeEvent, ReactElement, useContext, useEffect } from 'react'
import { ITableCommon, TableCommonContext } from './TableCommon'
import { useTableMutilCheckStore } from './store'
import { getValueObjectByPath } from 'src/@core/utils/objectResolver'
import { useSearchInvoiceStore } from 'src/containers/InvoiceContainers/List/ListInvoice/store'

const TableCommonBody = ({ extraRows, selectedKey }: { extraRows: ReactElement | undefined; selectedKey: string }) => {
  const { headerData, data, checkable } = useContext(TableCommonContext) as ITableCommon
  const { checkedSelected, setCheckedSelected } = useTableMutilCheckStore()
  const { isPaymentMode } = useSearchInvoiceStore()

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedSelected(event.target.value, event.target.checked)
  }

  return (
    <TableBody>
      {data.map(dataBody => (
        <TableRow key={getValueObjectByPath(selectedKey, dataBody)}>
          {checkable && (
            <TableCell width={50}>
              <Checkbox
                value={getValueObjectByPath(selectedKey, dataBody)}
                checked={checkedSelected.includes(getValueObjectByPath(selectedKey, dataBody))}
                onChange={handleCheck}
                disabled={isPaymentMode && getValueObjectByPath('invoice.is_paid', dataBody)}
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
      {extraRows}
    </TableBody>
  )
}

export default TableCommonBody
