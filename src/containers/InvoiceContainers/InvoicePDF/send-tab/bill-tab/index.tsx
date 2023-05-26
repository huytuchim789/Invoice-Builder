import { View } from '@react-pdf/renderer'

import { BankNamePdf } from './bank-name'
import { CountryPdf } from './country'
import { IBANPdf } from './iban'
import { SwiftCodePdf } from './swift-code'
import { TotalDuePdf } from './total-due'

export const BillTabPdf = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <TotalDuePdf />
      <BankNamePdf />
      <CountryPdf />
      <IBANPdf />
      <SwiftCodePdf />
    </View>
  )
}
