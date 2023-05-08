import { NextRouter } from 'next/router'

export type ControllerContext<Store> = {
  router?: NextRouter
  store?: Store
}
