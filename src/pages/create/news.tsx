// ** Next Imports
import { NextPage } from 'next'

// ** MUI Imports
import { Card } from '@mui/material'

import { CreateNews } from 'src/@core/content/create/news'
import getServerSideProps from '../account-settings'

const CreateNewsPage: NextPage = () => {
  return (
    <Card>
      <CreateNews />
    </Card>
  )
}

export default CreateNewsPage

export { getServerSideProps }
