import { View, Text } from '@react-pdf/renderer'

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  { id: 'item', label: 'Item', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 250 },
  { id: 'cost', label: 'Cost', minWidth: 50 },
  {
    id: 'hours',
    label: 'Hours',
    minWidth: 50
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100
  }
]

export const TableHeaderPdf = () => {
  return (
    <View
      style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#f9fafc' }}
    >
      {columns.map((column: Column) => (
        <View
          key={column.id}
          style={{
            minWidth: column.minWidth,
            padding: '10px'
          }}
        >
          <Text style={{ textAlign: column.align ? column.align : 'center', fontSize: 14, color: '#808080' }}>
            {column.label}
          </Text>
        </View>
      ))}
    </View>
  )
}
