import { Box, Typography } from '@mui/material'
import { useKeenSlider } from 'keen-slider/react'
import React from 'react'
import { TrailerContainer } from './styles'
import TrailerItemView from './trailerItem'

function LatestTrailerSection() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 400px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 3.2, spacing: 20 },
      },
    },
    slides: { perView: 1 },
  })
  return (
    <TrailerContainer>
      <Box position='relative' zIndex='1' px={5}>
        <Typography variant='h5' fontWeight='600' color='#fff'>
          Latest Trailers
        </Typography>
        <Box ref={ref} className='keen-slider' py={2.5}>
          <TrailerItemView />
          <TrailerItemView />
          <TrailerItemView />
          <TrailerItemView />
          <TrailerItemView />
          <TrailerItemView />
          <TrailerItemView />
          <TrailerItemView />
        </Box>
      </Box>
    </TrailerContainer>
  )
}

export default LatestTrailerSection
