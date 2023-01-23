import { Box, Card, CardContent, CardMedia, Chip, Container, Stack, Typography } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import CastsList from '../../components/castsList'
import SectionList from '../../components/sectionList'
import VideoList from '../../components/videoList'
import { DetailMovie } from '../../constants/types/detailMovieType'

const getRuntime = (runtime: number) => {
  const min = runtime % 60
  const hour = (runtime - min) / 60
  return `${hour > 0 ? `${hour}h` : ''}${min < 9 ? `0${min}` : min}m`
}

function FilmDetailView() {
  const router = useRouter()
  const [query, setQuery] = useState<{ type: string; id: string } | null>(null)

  const detailQuery = router.query.params

  useEffect(() => {
    detailQuery && setQuery({ type: detailQuery[0], id: detailQuery[1] })
  }, [detailQuery])

  const { data } = useSWR<DetailMovie>(query ? `${query.type}/${query.id}` : null)
  const { data: recommend } = useSWR(query ? `${query.type}/${query.id}/recommendations` : null)
  return (
    <Box pt='64px'>
      <Box
        component='div'
        sx={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.backdropPath})`,
        }}
      >
        <Box
          component='div'
          sx={{
            backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 30%, rgba(31.5, 31.5, 31.5, 0.84) 100%)`,
          }}
        >
          <Container maxWidth='lg'>
            <Stack direction='row' paddingY='30px' spacing={4} alignItems='center'>
              <Image
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data?.posterPath}`}
                alt='poster'
                width={300}
                height={450}
                style={{ borderRadius: '8px' }}
              />
              <Stack width='100%' color='#fff'>
                <Box component='div' mb={3}>
                  <Typography variant='h2' color='#fff' fontSize='2.5rem'>
                    {data?.originalTitle || data?.name}
                    <span style={{ fontWeight: '400', opacity: 0.8 }}>{`(${moment(data?.releaseDate).format(
                      'YYYY'
                    )})`}</span>
                  </Typography>

                  <Stack justifyContent='flex-start' direction='row' color='#fff' spacing={1}>
                    <Typography>{data?.genres.map((genre) => genre.name).join(', ')}</Typography>
                    {query?.type === 'movie' && (
                      <Typography
                        sx={{
                          position: 'relative',
                          paddingLeft: '16px',

                          '&::before': {
                            content: '""',
                            width: '6px',
                            height: '6px',
                            position: 'absolute',
                            background: '#fff',
                            borderRadius: '100%',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                          },
                        }}
                      >
                        {data?.runtime && getRuntime(data.runtime)}
                      </Typography>
                    )}
                  </Stack>
                </Box>

                <Box component='div' mb={2}>
                  <Stack>
                    <Typography fontSize='1.1rem' sx={{ opacity: 0.7, fontStyle: 'italic' }}>
                      {data?.tagline}
                    </Typography>
                    <Typography variant='h3' fontSize='1.3rem' my='10px'>
                      Overview
                    </Typography>
                    <Typography variant='body1'>{data?.overview}</Typography>
                  </Stack>
                </Box>

                <Box component='div'>
                  <Typography variant='h3' fontSize='1.3rem' my='10px'>
                    Top Billed Cast
                  </Typography>
                  <CastsList type={query?.type} id={query?.id} />
                </Box>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>

      <Box component='div'>
        <Container maxWidth='lg'>
          <Box component='div'>
            <Typography variant='h3' fontSize='1.5rem' my='10px'>
              Trailers and Videos
            </Typography>
            <VideoList type={query?.type} id={query?.id} />
          </Box>

          <Box component='div'>
            <SectionList
              title='Recommendations'
              data={camelcaseKeys(recommend?.results)}
              noData={
                recommend?.results.length === 0
                  ? `We don't have enough data to suggest any ${
                      query?.type === 'tv' ? 'TV shows' : 'movies'
                    } based on ${data?.originalTitle || data?.name}.`
                  : ''
              }
            />
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default FilmDetailView
