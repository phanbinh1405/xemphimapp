import React, { useState } from 'react'
import { Banner, FeaturedContainer } from './styles'
import { Box, TextField, Typography } from '@mui/material'
import SearchButton from './SearchButton'

export default function HeroSlider() {
  const [searchData, setData] = useState('')
  return (
    <FeaturedContainer>
      <Banner src={`/banner.jpg`} alt='banner' />

      <Box
        mx='auto'
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          color: '#fff',
          maxWidth: '1300px',
        }}
      >
        <Typography variant='h2' color='inherit' fontSize='3rem' fontWeight='700'>
          Welcome.
        </Typography>
        <Typography variant='h3' color='inherit' fontSize='2rem' fontWeight='600'>
          Millions of movies, TV shows and people to discover. Explore now.
        </Typography>

        <Box mt='60px' mx='auto' maxWidth='1300px'>
          <TextField
            onChange={(e) => setData(e.target.value)}
            sx={{
              '& fieldset': { border: 'none' },
            }}
            size='small'
            id='outlined-basic'
            variant='outlined'
            placeholder='Search for a movie, tv show,...'
            fullWidth
            style={{
              background: '#fff',
              borderRadius: '50px',
              border: 'none',
              outline: 0,
            }}
            InputProps={{
              sx: {
                color: 'rgba(0,0,0,0.5)',
                '& ::placeholder': {
                  color: 'rgba(0,0,0,0.5)',
                },
                '&.MuiOutlinedInput-root': {
                  paddingRight: 0,
                },
              },
              spellCheck: false,
              endAdornment: <SearchButton search={searchData} />,
            }}
          />
        </Box>
      </Box>
    </FeaturedContainer>
  )
}