//@ts-nocheck

import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import InvoiceEditOutline from 'mdi-material-ui/DatabaseEditOutline'
import InvoiceAddOutline from 'mdi-material-ui/PlusBoxOutline'
import InvoicePreviewOutline from 'mdi-material-ui/ViewListOutline'
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { globalStore } from 'src/@core/hocs/global-store'
import { isGuest } from 'src/@core/utils/role-check'

const navigation = (): VerticalNavItemsType => {
  const { user } = globalStore((state: any) => state.userStore)

  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Invoice'
    },
    {
      title: 'List',
      icon: InvoicePreviewOutline,
      path: '/invoice/list',
      openInNewTab: false,
      subject: 'hello'
    },
    // {
    //   title: 'Preview',
    //   icon: InvoicePreviewOutline,
    //   path: '/invoice/preview',
    //   openInNewTab: false
    // },
    // {
    //   title: 'Edit',
    //   icon: InvoiceEditOutline,
    //   path: '/invoice/edit',
    //   openInNewTab: false
    // },
    {
      title: 'Add',
      icon: InvoiceAddOutline,
      path: '/invoice/add',
      openInNewTab: false,
      disabled: isGuest(user)
    },
    {
      sectionTitle: 'Customers'
    },
    {
      title: 'List',
      icon: InvoicePreviewOutline,
      path: '/customer/list',
      openInNewTab: false,
      disabled: isGuest(user)
    },
    {
      sectionTitle: 'Item Invoice'
    },
    {
      title: 'List',
      icon: InvoicePreviewOutline,
      path: '/items/list',
      openInNewTab: false,
      disabled: isGuest(user)
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
