import { Search } from '@mui/icons-material'
import { Autocomplete, Box, Chip, Container, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ResultItem } from '../../components/searchResult/styles'

interface OptionType {
  name: string
  title: number
}

const RESULT_VALUE = [
  { title: 'Movies', key: 'movie', value: 0 },
  { title: 'People', key: 'people', value: 0 },
  { title: 'TV Shows', key: 'tv', value: 0 },
]

function SearchMainView() {
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [searchData, setSearchData] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchData(filter)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [filter])
  const { data } = useSWR(searchData !== '' ? `search/keyword?query=${searchData}` : null)
  return (
    <Box pt='64px' sx={{ flexGrow: 1 }}>
      <Box borderBottom={1} borderColor={'rgb(227,227,227)'} mb={4}>
        <Container>
          <Autocomplete
            freeSolo
            options={data?.results || []}
            getOptionLabel={(option: OptionType | string) => {
              if (typeof option === 'string') {
                return option
              }

              return option.name
            }}
            renderOption={(props, option: OptionType) => (
              <li {...props} onClick={() => router.push(`/search/${option.name}`)}>
                {option.name}
              </li>
            )}
            sx={{
              '& .MuiOutlinedInput-root': {
                paddingX: 0,
                paddingY: '10px',
              },
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Search for a movie, tv show,...'
                onChange={(e) => setFilter(e.target.value)}
                onKeyDown={(e) => e.code === 'Enter' && router.push(`/search/${filter}`)}
                InputProps={{
                  sx: {
                    color: 'rgba(0,0,0,0.5)',
                    '& ::placeholder': {
                      color: 'rgba(0,0,0,0.5)',
                    },
                    border: 0,
                  },
                  ...params.InputProps,
                  spellCheck: false,
                  startAdornment: <Search />,
                }}
              />
            )}
          />
        </Container>
      </Box>

      <Container maxWidth='lg'>
        <Grid container spacing={5}>
          <Grid xs={3}>
            <Box height='90vh'>
              <Box sx={{ borderRadius: '8px', overflow: 'hidden' }} component='div'>
                <Box component='div' sx={{ padding: '20px', background: 'rgb(1,180,228)' }}>
                  <Typography variant='h3' color='#fff'>
                    Search Result
                  </Typography>
                </Box>
                <Box
                  component='div'
                  sx={{
                    border: '1px solid rgb(227,227,227)',
                    paddingBlock: '8px',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                  }}
                >
                  {RESULT_VALUE.map((item) => {
                    return (
                      <ResultItem key={item.key} direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography>{item.title}</Typography>
                        <Chip
                          label={item.value}
                          sx={{
                            '&.MuiChip-root': {
                              height: '22px',
                              borderRadius: '4px',
                            },
                          }}
                        />
                      </ResultItem>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={9}>
            <Box height='90vh'>
              <Typography>There are no movies that matched your search.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default SearchMainView
