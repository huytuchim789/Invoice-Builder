import { useInvoiceAddStore } from '../../store'
import { GridAccumulate } from '../components/grid-accumulate'

export const Total = () => {
  const { subTotal } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

  return (
    <GridAccumulate
      title='Total'
      content={`${subTotal + (subTotal * 21) / 100}`}
      style={{ borderTop: 1, borderColor: '#808080' }}
    />
  )
}
