import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useDebounce = (value: string | number, delay: number) => {
  const router = useRouter()
  const [debounceValue, setDebounceValue] = useState(router.query.keyword ? router.query.keyword : value)

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceValue(value)
      router.push({
        pathname: '/invoice/list',
        search: `?keyword=${value}`
      })
    }, delay)

    return () => {
      clearTimeout(handle)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
