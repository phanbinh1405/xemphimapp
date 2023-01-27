import { Avatar, Stack, Typography, useTheme } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Grid from '@mui/material/Unstable_Grid2'
import SectionList from '../../components/sectionList'
import useSWR from 'swr'
import camelcaseKeys from 'camelcase-keys'

function ProfileView() {
  const { profile } = useContext(AuthContext)
  const theme = useTheme()

  const { data: favoriteMovies, isLoading: isMovieLoading } = useSWR(`account/${profile?.id}/favorite/movies`)
  const { data: favoriteTv, isLoading: isTvLoading } = useSWR(`account/${profile?.id}/favorite/tv`)
  const { data: movieWatchlist, isLoading: isMovieWatchlistLoading } = useSWR(`account/${profile?.id}/watchlist/movies`)
  const { data: tvShowWatchlist, isLoading: isTvWatchlistLoading } = useSWR(`account/${profile?.id}/watchlist/tv`)
  return (
    <Box mt='64px'>
      <Box component='div' sx={{ background: 'rgb(3, 37, 65)' }}>
        <Box
          component='div'
          sx={{ background: 'url(./purple-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center -250px' }}
        >
          <Container maxWidth='lg'>
            <Box padding={5} color={theme.palette.common.white}>
              <Stack alignItems='center'>
                <Avatar
                  src={`https://image.tmdb.org/t/p/w500${profile?.avatar.tmdb.avatar_path}`}
                  sx={{ width: 150, height: 150 }}
                />
                <Typography variant='h2' fontSize='2rem' fontWeight='700' mt={3}>
                  {profile?.name}
                </Typography>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
      <Container maxWidth='lg'>
        <SectionList
          title='Favorite Movies'
          data={camelcaseKeys(favoriteMovies?.results)}
          path='movie'
          noData={
            !isMovieLoading && favoriteMovies?.results.length <= 0 ? `You haven't added any favorite Movies.` : ''
          }
        />
        <SectionList
          title='Movies Watchlist'
          data={camelcaseKeys(movieWatchlist?.results)}
          path='movie'
          noData={
            !isMovieWatchlistLoading && movieWatchlist?.results.length <= 0
              ? `You haven't added any movies watchlist.`
              : ''
          }
        />
        <SectionList
          title='Favorite Tv Shows'
          data={camelcaseKeys(favoriteTv?.results)}
          path='movie'
          noData={!isTvLoading && favoriteTv?.results.length <= 0 ? `You haven't added any favorite TV shows.` : ''}
        />
        <SectionList
          title='Tv Shows Watchlist'
          data={camelcaseKeys(tvShowWatchlist?.results)}
          path='movie'
          noData={
            !isTvWatchlistLoading && tvShowWatchlist?.results.length <= 0
              ? `You haven't added any to Tv Shows Watchlist.`
              : ''
          }
        />
      </Container>
    </Box>
  )
}

export default ProfileView
