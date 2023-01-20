import { Autocomplete, Box, Container, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useSWR from 'swr'
import { Search } from '@mui/icons-material'

const TRENDING_SEARCH = [
  'The Last of Us',
  'Puss in Boots: The Last Wish',
  'Three-Body',
  'Avatar: The Way of Water',
  'The Menu',
  'Dog Gone',
  'Ant-Man and the Wasp: Quantumania',
  'M3GAN',
  'The Old Way',
  'Hunters',
]

interface OptionType {
  name: string
  title: number
}

function SearchResultsView() {
  const [filter, setFilter] = useState('')
  const router = useRouter()
  const { search } = router.query
  const { data } = useSWR(`search/keyword?query=${filter}`)
  console.log(data)
  return (
    <Box pt='64px' sx={{ flexGrow: 1 }}>
      <Box borderBottom={1} borderColor={'rgb(227,227,227)'} mb={4}>
        <Container>
          <Autocomplete
            freeSolo
            onChange={(e) => console.log(e.currentTarget.getAttribute('title') === 'Clear')}
            options={(data || []).map((option: OptionType) => option.name)}
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
                  disableUnderline: true,
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
            <Box bgcolor='darkcyan' height='90vh'></Box>
          </Grid>
          <Grid xs={9}>
            <Box bgcolor='blue' height='90vh'></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default SearchResultsView
