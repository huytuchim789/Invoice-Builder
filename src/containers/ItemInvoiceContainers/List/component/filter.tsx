import { useFilterStore } from '../store'

const ctx: Types.ControllerContext<any> = {}

export function useFilterData() {
  ctx.store = useFilterStore(state => [state.searchParamStore])

  const [searchFilter] = ctx.store

  const handleChangeSearchParams = (value: string | number | string[]) => {
    searchFilter.setSearchParam(value)
  }

  return {
    searchValue: searchFilter.searchParam,
    handleChangeSearchParams
  }
}
