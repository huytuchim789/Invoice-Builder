// ** React Imports
import dynamic from 'next/dynamic'
import { ChangeEvent, useState, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import { QUILL_CONFIG } from 'src/configs/reactQuillConfig'
import { MenuItem, Select, SelectChangeEvent, TextareaAutosize, Typography } from '@mui/material'
import { NEWS_LIST, NewsList } from 'src/@core/models/common'
import { IDataLogin, useDataLogin } from 'src/stores/useDataLogin'
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert'
import { createNews } from 'src/@core/utils/api/news'
import { ICreateNewsResponse } from 'src/@core/models/api/news.interface'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

interface State {
  title: string
  type: string
  image: string | ArrayBuffer | null
  description: string
  content: string
}

export const CreateNews = () => {
  // ** Store
  const [userInfo] = useDataLogin((state: IDataLogin) => [state.userInfo])
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update])

  // ** States
  const imageFile = useRef() as React.MutableRefObject<HTMLInputElement>
  const [values, setValues] = useState<State>({
    title: '',
    type: '',
    image: '',
    description: '',
    content: ''
  })

  //handle and convert it in base 64
  const handleImage = (e: any) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }

  const setFileToBase = (file: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setValues({ ...values, image: reader.result })
    }
  }

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChangeContent = (content: string) => {
    setValues({ ...values, content })
  }

  const handleSelectType = (type: SelectChangeEvent<string>) => {
    setValues({ ...values, type: type.target.value })
  }

  const handleCreateNews = async (e: { preventDefault: () => void }) => {
    if (userInfo.token !== '') {
      try {
        e.preventDefault()

        const response = (await createNews({
          ...values,
          device: 'web',
          accessToken: userInfo.token
        })) as ICreateNewsResponse

        if (response.success) {
          update({
            message: response.message,
            severity: 'success',
            open: true
          })
        } else {
          update({
            message: response.message,
            severity: 'error',
            open: true
          })
        }
      } catch (error: any) {
        update({
          message: error.message,
          severity: 'error',
          open: true
        })
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Create News' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleCreateNews}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label='Title' placeholder='Leonard Carter' onChange={handleChange('title')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Type'
                      onChange={handleSelectType}
                    >
                      {NEWS_LIST.map((news: NewsList) => (
                        <MenuItem value={news.value} key={news.id}>
                          {news.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <input type='file' onChange={handleImage} ref={imageFile} accept='image/png, image/gif, image/jpeg' />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography py={3}>Description</Typography>
                <TextField onChange={handleChange('description')} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography py={3}>Content Mobile</Typography>
                <TextareaAutosize maxRows={10} minRows={10} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography py={3}>Content Desktop</Typography>
                <ReactQuill
                  style={{ height: '200px' }}
                  onChange={(content: string) => handleChangeContent(content)}
                  modules={QUILL_CONFIG.modules}
                  formats={QUILL_CONFIG.formats}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '50px' }}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Create
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
