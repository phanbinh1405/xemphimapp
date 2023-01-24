import { Box, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import MovieGrid from '../../components/movieGrid'

function Catalog() {
  const router = useRouter()
  const { type } = router?.query

  return (
    <>
      <Head>
        <title>{type === 'tv' ? 'Popular TVs' : 'Popular Movies'}</title>
      </Head>

      <Box component='div'>
        <Container maxWidth='lg'>
          <Box mt='64px' sx={{ textAlign: 'center', paddingTop: '30px', marginBottom: '20px' }}>
            <Typography fontSize='1.6rem' variant='h2'>
              {type === 'tv' ? 'Popular TV Series' : 'Popular Movies'}
            </Typography>
          </Box>

          <Box component='div' sx={{ overflowX: 'hidden' }}>
            <MovieGrid type={type} />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Catalog
