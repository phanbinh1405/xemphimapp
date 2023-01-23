import React from 'react'
import useSWR from 'swr'
import HeroSlider from '../components/heroSlider'
import SectionList from '../components/sectionList'
import { Container } from '@mui/system'
import camelcaseKeys from 'camelcase-keys'
import Head from 'next/head'

const HomePage = () => {
  const { data: trendingMoviesData } = useSWR('trending/movie/day')
  const { data: topRatedMovies } = useSWR('movie/top_rated')
  const { data: trendingTvData } = useSWR('trending/tv/day')
  const { data: topRatedTv } = useSWR('tv/top_rated')

  return (
    <>
      <Head>
        <title>The Movie Homepage</title>
      </Head>
      <HeroSlider />
      <Container maxWidth='lg'>
        <SectionList data={camelcaseKeys(trendingMoviesData?.results)} title='Trending Movies' />
        <SectionList data={camelcaseKeys(topRatedMovies?.results)} title='Top Rated Movies' path={'movie'} />
        <SectionList data={camelcaseKeys(trendingTvData?.results)} title='Trending TV' />
        <SectionList data={camelcaseKeys(topRatedTv?.results)} title='Top Rated TV' path={'tv'} />
      </Container>
    </>
  )
}

export default HomePage
