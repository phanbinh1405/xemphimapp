import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import camelcaseKeys from 'camelcase-keys'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useSWR from 'swr'
import { TrendingItem } from '../../constants/types/trendingType'
import Item from '../sectionItem'

function MovieGrid({ type }: { type: string | undefined | string[] }) {
  const [page, setPage] = useState(1)
  const { data } = useSWR(type ? `${type}/popular?page=${page}` : null)
  const [movieData, setMovieData] = useState<TrendingItem[]>([])
  useEffect(() => {
    setMovieData([])
    setPage(1)
  }, [type])

  useEffect(() => {
    if (data && movieData?.length > 0) {
      setMovieData((prev) => [...prev, ...data.results])
    } else if (data && movieData?.length <= 0) {
      setMovieData(data?.results)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page])
  
  return (
    <InfiniteScroll
      dataLength={movieData?.length || 0}
      next={() => setPage(page + 1)}
      hasMore={true}
      loader={
        <Stack alignItems='center'>
          <div className='lds-facebook'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Stack>
      }
      style={{ overflowX: 'hidden' }}
    >
      <Grid container spacing={3.5}>
        {movieData?.map((movie: TrendingItem) => {
          return (
            <Grid key={movie?.id} xs={6} md={3} lg={2.4}>
              <Item info={camelcaseKeys(movie)} height={330} path={type} />
            </Grid>
          )
        })}
      </Grid>
    </InfiniteScroll>
  )
}

export default MovieGrid
