import { Avatar, Box, Stack, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import React, { memo } from 'react'
import { MovieSearchResult } from '../../constants/types/movieSearchResultType'
import { KnownFor, PeopleSearchResult } from '../../constants/types/peopleSearchResultType'
import { TvSearchResult } from '../../constants/types/tvSearchResultType'

interface FilmItemProps {
  showResult: string
  data: TvSearchResult | MovieSearchResult | PeopleSearchResult
}

function FilmItem({ showResult, data }: FilmItemProps) {
  return (
    <Stack
      component='div'
      direction='row'
      border='1px solid rgb(227, 227, 227)'
      borderRadius='8px'
      overflow='hidden'
      boxShadow='0 2px 8px rgb(0 0 0 / 10%)'
    >
      {showResult === 'movie' || showResult === 'tv' ? (
        <>
          <Image
            src={
              data.poster_path
                ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${data.poster_path}`
                : '/film_poster.jpg'
            }
            alt='poster'
            width={94}
            height={140}
          />
          <Stack paddingY='10px' paddingX='15px' justifyContent='center'>
            <Box component='div'>
              <Typography variant='h2'>{data.original_title || data.original_name}</Typography>
              <Typography variant='body1' color='#999'>
                {`${moment(data.release_date || data.first_air_date).format('MMM DD, YYYY')}`}
              </Typography>
            </Box>
            <Typography
              variant='body1'
              component='p'
              lineHeight='1.2'
              mt='20px'
              sx={{
                display: '-webkit-box',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
                'text-overflow': 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {data?.overview}
            </Typography>
          </Stack>
        </>
      ) : (
        <>
          <Avatar
            src={`https://www.themoviedb.org/t/p/w90_and_h90_face/${data?.profile_path}`}
            variant='rounded'
            sx={{ width: 70, height: 70 }}
          />
          <Stack paddingY='10px' paddingX='15px' justifyContent='center'>
            <Box component='div'>
              <Typography variant='h2'>{data.name}</Typography>
            </Box>
            <Typography
              variant='body1'
              component='p'
              lineHeight='1.2'
              sx={{
                display: '-webkit-box',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
                'text-overflow': 'ellipsis',
                overflow: 'hidden',
              }}
            >
              Acting: {data?.known_for.map((item: KnownFor) => item.original_title || item.original_name).join(', ')}
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default memo(FilmItem)
