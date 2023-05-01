// ** React, Next Imports
import { ReactElement, useCallback } from 'react'
import { ChangeEvent } from 'react'
import { useRouter } from 'next/router'

// ** Library Outside Imports
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import debounce from 'lodash.debounce'

// ** MUI Imports
import { Box, OutlinedInput, InputAdornment, Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'

// ** Table Import
import TableCommon from 'src/views/tables/TableCommon'

// Api Data, Interface Imports
import { INewsListDataResponse } from 'src/@core/models/api/news.interface'
import { getNewsList } from 'src/@core/utils/api/news'
import { getCheckAuthProps } from 'src/@core/common/checkAuthProps'

dayjs.extend(utc)

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

const NewsPage = ({ data }: { data: INewsListDataResponse }) => {
  const router = useRouter()

  const debounceKeyword = (keyword: string) => {
    router.push({
      pathname: '/pages/news',
      search: `?page=${router.query?.page ?? 1}&limit=${router.query?.limit ?? 2}&keyword=${keyword}`
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceInput = useCallback(
    debounce((keyword: string) => debounceKeyword(keyword), 1000),
    []
  )

  const onChangeKeyword = (e: { target: { value: string } }) => {
    debounceInput(e.target.value)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage > 0) {
      router.push({
        pathname: '/pages/news',
        search: `?page=${newPage}&limit=${router.query?.limit ?? 2}&keyword=${router.query?.keyword ?? ''}`
      })
    }
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: '/pages/news',
      search: `?page=${router.query?.page ?? 1}&limit=${+event.target.value}&keyword=${router.query?.keyword ?? ''}`
    })
  }

  return (
    <Card>
      <CardHeader title='News List' titleTypographyProps={{ variant: 'h6' }} />
      <Box
        component={'div'}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        padding={5}
      >
        <OutlinedInput
          type='text'
          placeholder='Search News here...'
          startAdornment={
            <InputAdornment position='start'>
              <SearchTwoToneIcon />
            </InputAdornment>
          }
          onChange={onChangeKeyword}
        />
        <Button href='/create/news' variant='contained'>
          Create News
        </Button>
      </Box>
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
  const { query, req } = context

  const checkAuth = await getCheckAuthProps(req.headers.cookie)

  if (checkAuth) {
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
    })) as INewsListDataResponse

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
