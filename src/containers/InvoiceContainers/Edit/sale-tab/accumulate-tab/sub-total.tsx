import { useInvoiceEditStore } from '../../store'
import { GridAccumulate } from '../components/grid-accumulate'

export const SubTotal = () => {
  const { subTotal } = useInvoiceEditStore((state: any) => state.itemContentTabStore)

  return <GridAccumulate title='Subtotal' content={`${subTotal}`} />
}
