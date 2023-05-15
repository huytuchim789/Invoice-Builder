import { Discount } from './discount'
import { SubTotal } from './sub-total'
import { Tax } from './tax'
import { Total } from './total'

export const Accumulate = () => {
  return (
    <>
      <SubTotal />
      <Discount />
      <Tax />
      <Total />
    </>
  )
}
