import React from "react";
import useSWR from "swr";
import HeroSlider from "../components/heroSlider";
import SectionList from "../components/sectionList";
import { Container } from "@mui/system";

const HomePage = () => {
  const { data: trendingMoviesData } = useSWR("trending/movie/day");
  const { data: topRatedMovies } = useSWR("movie/top_rated");
  const { data: trendingTvData } = useSWR("trending/tv/day");
  const { data: topRatedTv } = useSWR("tv/top_rated");

  return (
    <>
      <HeroSlider />
      <Container sx={{ minWidth: "1348px" }}>
        <SectionList data={trendingMoviesData} title="Trending Movies" />
        <SectionList data={topRatedMovies} title="Top Rated Movies" />
        <SectionList data={trendingTvData} title="Trending TV" />
        <SectionList data={topRatedTv} title="Top Rated TV" />
      </Container>
    </>
  );
};

export default HomePage;