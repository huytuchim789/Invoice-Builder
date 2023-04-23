// ** React, Next Imports
import { ReactElement } from 'react'
import { ChangeEvent } from 'react'
import { useRouter } from 'next/router'

// ** Library Outside Imports
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Table Import
import TableCommon from 'src/views/tables/TableCommon'

// Api Data, Interface Imports
import { NewsListDataResponse } from 'src/@core/models/api/news'
import { getNewsList } from 'src/@core/utils/api/news'
import { USER_INFO } from 'src/@core/models'

dayjs.extend(utc)

interface Cookies {
  [name: string]: string
}
export interface ColumnNews {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  formatString?: (value: string) => ReactElement
  formatNumber?: (value: number) => ReactElement
}

const columns: readonly ColumnNews[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Title', minWidth: 150 },
  {
    id: 'image',
    label: 'Image',
    minWidth: 300
  },
  {
    id: 'view',
    label: 'View',
    minWidth: 10
  },
  {
    id: 'content',
    label: 'Content',
    minWidth: 170
  },
  {
    id: 'day',
    label: 'Day',
    minWidth: 170
  }
]

const NewsPage = ({ data }: { data: NewsListDataResponse }) => {
  const router = useRouter()

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage > 0) {
      router.push({
        pathname: '/pages/news',
        search: `?page=${newPage}&limit=${router.query?.limit ?? 2}`
      })
    }
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: '/pages/news',
      search: `?page=${router.query?.page ?? 1}&limit=${+event.target.value}`
    })
  }

  return (
    <Card>
      <CardHeader title='News List' titleTypographyProps={{ variant: 'h6' }} />
      <TableCommon
        title={'News List'}
        columns={columns}
        data={data}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default NewsPage

export const getServerSideProps = async (context: {
  query: { limit: string; page: string; keyword: string; startTime: string; endTime: string }
  req: { headers: { cookie: string } }
}) => {
  const cookies: Cookies = {}
  const { query, req } = context

  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach((cookie: string) => {
      const parts = cookie.split('=')
      cookies[parts[0].trim()] = decodeURIComponent(parts[1].trim())
    })
  }

  if (!!!cookies[USER_INFO]) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  const limit = query?.limit ?? 10
  const page = query?.page ?? 1
  const keyword = query?.keyword ?? ''
  const startTime = query?.startTime ?? dayjs.utc().subtract(2, 'months').startOf('month').unix()
  const endTime = query?.endTime ?? dayjs.utc().endOf('month').unix()

  try {
    const response = (await getNewsList({
      limit: Number(limit),
      page: Number(page),
      keyword,
      startTime: Number(startTime),
      endTime: Number(endTime)
    })) as NewsListDataResponse

    if (response.success) {
      return {
        props: {
          data: response
        }
      }
    } else {
      return {
        redirect: {
          destination: '/500',
          permanent: false
        }
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false
      }
    }
  }
}
