import { BankNamePdf } from './bank-name'
import { CountryPdf } from './country'
import { IBANPdf } from './iban'
import { SwiftCodePdf } from './swift-code'
import { TotalDuePdf } from './total-due'

export const BillTabPdf = () => {
  return (
    <>
      <TotalDuePdf />
      <BankNamePdf />
      <CountryPdf />
      <IBANPdf />
      <SwiftCodePdf />
    </>
  )
}
