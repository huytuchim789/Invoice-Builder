export interface ICardInfo {
  data: {
    id: 'pm_1NNeeeLt2JAaPrAXCACi0vk0'
    object: 'payment_method'
    billing_details: {
      address: {
        city: string | null
        country: string | null
        line1: string | null
        line2: string | null
        postal_code: string | null
        state: string | null
      }
      email: string | null
      name: string | null
      phone: string | null
    }
    card: {
      brand: string
      checks: {
        address_line1_check: string | null
        address_postal_code_check: string | null
        cvc_check: string
      }
      country: string
      exp_month: number
      exp_year: number
      fingerprint: string
      funding: string
      generated_from: string | null
      last4: string
      networks: {
        available: string[]
        preferred: string | null
      }
      three_d_secure_usage: {
        supported: boolean
      }
      wallet: string | null
    }
    created: number
    customer: string
    livemode: boolean
    metadata: []
    type: string
  }
  message: string
}

export interface ICardProps {
  type: string
  details: {
    number: string
    exp_month: string
    exp_year: string
    cvc: string
  }
}

export interface IPlanProData {
  data: {
    id: string
    object: string
    address: string | null
    balance: number
    created: number
    currency: string
    default_currency: string
    default_source: string | null
    delinquent: boolean
    description: string | null
    discount: string | null
    email: string
    invoice_prefix: string
    invoice_settings: {
      custom_fields: string | null
      default_payment_method: string
      footer: string | null
      rendering_options: string | null
    }
    livemode: boolean
    metadata: []
    name: string
    next_invoice_sequence: number
    phone: string | null
    preferred_locales: []
    shipping: string | null
    tax_exempt: string
    test_clock: string | null
  }
  message: string
}

export interface IUnSubcribeItemResponseData {
  id: number
  subscription_id: number
  stripe_id: string
  stripe_product: string
  stripe_price: string
  quantity: number
  created_at: string
  updated_at: string
}

export interface IUnSubcribeResponseData {
  data: {
    id: number
    user_id: string
    name: string
    stripe_id: string
    stripe_status: string
    stripe_price: string
    quantity: number
    trial_ends_at: string | null
    ends_at: string | null
    created_at: string
    updated_at: string
    items: IUnSubcribeItemResponseData[]
  }
  message: string
}
