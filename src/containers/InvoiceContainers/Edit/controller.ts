import useInvoiceStore from 'src/@core/components/Invoice/store'
import { globalStore } from 'src/@core/hocs/global-store'

export default function useInvoiceEditController() {
  const { user } = globalStore((state: any) => state.userStore)

  const { itemInfo, userSelectInfo, noteInfo, dateInfo } = useInvoiceStore()
}
