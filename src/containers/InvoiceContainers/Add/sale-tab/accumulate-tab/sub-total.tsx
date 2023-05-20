import { useInvoiceAddStore } from '../../store'
import { GridAccumulate } from '../components/grid-accumulate'

export const SubTotal = () => {
  const { subTotal } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

  return <GridAccumulate title='Subtotal' content={`${subTotal}`} />
}
