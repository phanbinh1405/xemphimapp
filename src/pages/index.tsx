import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import HeroSlider from '../components/heroSlider'
import SectionList from '../components/sectionList'
import { Container } from '@mui/system'
import camelcaseKeys from 'camelcase-keys'
import Head from 'next/head'
import { TrendingItem } from '../constants/types/trendingType'

interface HomePageProps {
  trendingMovies: TrendingItem[]
  topRatedMovies: TrendingItem[]
  trendingTv: TrendingItem[]
  topRateTv: TrendingItem[]
}

const HomePage = (props: HomePageProps) => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingItem[]>(() => camelcaseKeys(props.trendingMovies))
  const [topRatedMovies, setTopRateMovies] = useState<TrendingItem[]>(() => camelcaseKeys(props.topRatedMovies))
  const [trendingTv, setTrendingTv] = useState<TrendingItem[]>(() => camelcaseKeys(props.trendingTv))
  const [topRateTv, setTopRateTv] = useState<TrendingItem[]>(() => camelcaseKeys(props.topRateTv))

  const { data: trendingMoviesData } = useSWR('trending/movie/day')
  const { data: topRatedMoviesData } = useSWR('movie/top_rated')
  const { data: trendingTvData } = useSWR('trending/tv/day')
  const { data: topRatedTv } = useSWR('tv/top_rated')

  useEffect(() => {
    if (trendingMoviesData?.results) {
      setTrendingMovies(camelcaseKeys(trendingMoviesData?.results))
    }
    if (topRatedMoviesData?.results) {
      setTopRateMovies(camelcaseKeys(topRatedMoviesData?.results))
    }
    if (trendingTvData?.results) {
      setTrendingTv(camelcaseKeys(trendingTvData?.results))
    }
    if (topRatedTv?.results) {
      setTopRateTv(camelcaseKeys(topRatedTv?.results))
    }
  }, [trendingMoviesData, topRatedMoviesData, trendingTvData, topRatedTv])

  return (
    <>
      <Head>
        <title>The Movie Homepage</title>
      </Head>
      <HeroSlider />
      <Container maxWidth='lg'>
        <SectionList data={trendingMovies} title='Trending Movies' />
        <SectionList data={topRatedMovies} title='Top Rated Movies' path={'movie'} />
        <SectionList data={trendingTv} title='Trending TV' />
        <SectionList data={topRateTv} title='Top Rated TV' path={'tv'} />
      </Container>
    </>
  )
}

export default HomePage

export async function getStaticProps() {
  const [trendingMovieRes, topRatedMoviesRes, trendingTvRes, topRateTvRes] = await Promise.all([
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=ca6836e856aeef031f2cd0392f38db46'),
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ca6836e856aeef031f2cd0392f38db46'),
    fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=ca6836e856aeef031f2cd0392f38db46'),
    fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=ca6836e856aeef031f2cd0392f38db46'),
  ])
  const trendingMovies = await trendingMovieRes.json()
  const topRatedMovies = await topRatedMoviesRes.json()
  const trendingTv = await trendingTvRes.json()
  const topRateTv = await topRateTvRes.json()

  return {
    props: {
      trendingMovies: trendingMovies.results,
      topRatedMovies: topRatedMovies.results,
      trendingTv: trendingTv.results,
      topRateTv: topRateTv.results,
    },
    revalidate: 43200,
  }
}
