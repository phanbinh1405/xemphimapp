import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import React from 'react'
import { PlayIcon } from '../styles'

function TrailerItemView() {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: 355,
          border: 'none',
          boxShadow: 'none',
          background: 'transparent',
        }}
        className='keen-slider__slide'
      >
        <CardActionArea
          sx={{
            '&:hover .MuiCardMedia-img ': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Box style={{ position: 'relative' }}>
            <CardMedia
              sx={{
                borderRadius: '8px',
                transition: '0.3s',
              }}
              component='img'
              height='200'
              width='355'
              image='https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/tE6dWq9neq2IPSc6kJQdxyMrl7w.jpg'
              alt='green iguana'
            />
            <PlayIcon>
              <PlayArrowIcon fontSize='inherit' />
            </PlayIcon>
          </Box>
          <CardContent
            sx={{
              paddingTop: '0px',
              paddingInline: '10px',
              paddingBottom: 0,
              textAlign: 'center',
            }}
          >
            <Typography gutterBottom variant='h6' component='div' color='#fff' sx={{ fontWeight: '700', margin: 0 }}>
              Darna
            </Typography>
            <Typography gutterBottom variant='body1' component='div' color='#fff'>
              Darna | Official Trailer
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default TrailerItemView
