import { Box, Container, Pagination, Stack, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useRouter } from 'next/router'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { Search } from '@mui/icons-material'
import Link from 'next/link'
import { ResultContainer, ResultItem } from './styles'
import SearchResult from '../../components/searchResult'
import FilmItem from '../../components/searchResult/FilmItem'
import { TvSearchResult } from '../../constants/types/tvSearchResultType'
import { PeopleSearchResult } from '../../constants/types/peopleSearchResultType'
import { MovieSearchResult } from '../../constants/types/movieSearchResultType'
import Head from 'next/head'

interface OptionType {
  name: string
  id?: number
}

const INIT_PAGE = {
  moviePage: 1,
  peoplePage: 1,
  tvPage: 1,
}

function SearchResultsView() {
  const router = useRouter()
  const { search } = router.query
  const [filter, setFilter] = useState(search)
  const [valueSearch, setValueSearch] = useState<string | string[]>('')
  const [page, setPage] = useState(INIT_PAGE)
  const [isSearch, setIsSearch] = useState(false)
  const [showResult, setShow] = useState('movie')
  const [totalPages, setTotalPages] = useState<{ movie: number; people: number; tv: number } | null>(null)
  const [filterData, setFilterData] = useState<string | string[]>('')
  const searchRef = useRef<HTMLElement>(null)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    showResult === 'movie'
      ? setPage({ ...page, moviePage: value })
      : showResult === 'people'
      ? setPage({ ...page, peoplePage: value })
      : setPage({ ...page, tvPage: value })
  }

  useEffect(() => {
    search && setFilter(search)
    search && setFilterData(search)
    setIsSearch(false)
  }, [search])

  useEffect(() => {
    const timeout = setTimeout(() => filter && setValueSearch(filter), 500)
    return () => clearTimeout(timeout)
  }, [filter])

  useEffect(() => {
    const handler = (e: any): void => {
      if (searchRef?.current && !searchRef?.current?.contains(e.target)) {
        setIsSearch(false)
      }
    }
    isSearch && document.addEventListener('mousedown', handler)

    return () => document.removeEventListener('mousedown', handler)
  })

  // Call Api
  const { data } = useSWR(
    valueSearch ? `search/keyword?query=${valueSearch}&page=1` : filter ? `search/keyword?query=${filter}&page=1` : null
  )

  const { data: moviesResults } = useSWR(filterData ? `search/movie?query=${filterData}&page=${page.moviePage}` : null)

  const { data: peopleResults } = useSWR(
    filterData ? `search/person?query=${filterData}&page=${page.peoplePage}` : null
  )

  const { data: tvResults } = useSWR(filterData ? `search/tv?query=${filterData}&page=${page.tvPage}` : null)

  useEffect(() => {
    moviesResults &&
      peopleResults &&
      tvResults &&
      setTotalPages({
        movie: moviesResults.totalPages,
        people: peopleResults.totalPages,
        tv: tvResults.totalPages,
      })
  }, [moviesResults, peopleResults, tvResults])
  return (
    <>
      <Head>
        <title>Search Results for {filterData}</title>
      </Head>

      <Box pt='64px' sx={{ flexGrow: 1 }}>
        <Box borderBottom={1} borderColor={'rgb(227,227,227)'} mb={4} ref={searchRef}>
          <Container>
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                value={filter}
                onChange={(e) => {
                  setIsSearch(true)
                  setFilter(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    router.push(`/search/${filter}`)
                    setIsSearch(false)
                  }
                }}
                onFocus={() => setIsSearch(true)}
                placeholder='Search for a movie, tv show,...'
                sx={{ '& .MuiInputBase-input': { paddingLeft: '14px' } }}
                InputProps={{
                  sx: {
                    color: 'rgba(0,0,0,0.5)',
                    '& ::placeholder': {
                      color: 'rgba(0,0,0,0.5)',
                    },
                    '& fieldset': { border: 'none' },
                    padding: 0,
                  },
                  spellCheck: false,
                  startAdornment: <Search />,
                }}
              />
              {isSearch && data?.results && data?.results.length > 0 && (
                <ResultContainer component='ul'>
                  {data?.results &&
                    data?.results.length > 0 &&
                    data?.results.map((option: OptionType) => {
                      return (
                        <ResultItem key={option.id}>
                          <Link
                            className='search-result'
                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                            href={`/search/${option.name}`}
                          >
                            {option.name}
                          </Link>
                        </ResultItem>
                      )
                    })}
                </ResultContainer>
              )}
            </Box>
          </Container>
        </Box>

        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid xs={3}>
              <Box height='90vh'>
                <SearchResult
                  movie={moviesResults}
                  people={peopleResults}
                  tv={tvResults}
                  setShowResults={(key: string) => {
                    setShow(key)
                    setPage(INIT_PAGE)
                  }}
                />
              </Box>
            </Grid>
            <Grid xs={9}>
              <Stack minHeight='90vh' spacing={3}>
                {showResult === 'movie'
                  ? moviesResults?.results.map((item: MovieSearchResult) => {
                      return <FilmItem key={item.id} showResult={showResult} data={item} />
                    })
                  : showResult === 'tv'
                  ? tvResults?.results.map((item: TvSearchResult) => {
                      return <FilmItem key={item.id} showResult={showResult} data={item} />
                    })
                  : peopleResults?.results.map((item: PeopleSearchResult) => {
                      return <FilmItem key={item.id} showResult={showResult} data={item} />
                    })}
              </Stack>
              <Stack spacing={2} alignItems='center' mt={2}>
                <Pagination
                  count={
                    showResult === 'movie'
                      ? totalPages?.movie
                      : showResult === 'people'
                      ? totalPages?.people
                      : totalPages?.tv
                  }
                  page={
                    showResult === 'movie' ? page.moviePage : showResult === 'people' ? page.peoplePage : page.tvPage
                  }
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default SearchResultsView
