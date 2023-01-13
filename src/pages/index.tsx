import React, { useState } from "react";
import { Box } from "@mui/material";
import HeroSlider from "../components/heroSlider";
import SectionList from "../components/sectionList";
import { Container } from "@mui/system";
import LatestTrailerSection from "../components/latestTrailerSection";

const HomePage = () => {
	return (
		<>
			<HeroSlider />
			<Container sx={{ minWidth: "1348px" }}>
				<SectionList />
				<LatestTrailerSection />
				<SectionList title='Trending' />
			</Container>
		</>
	);
};

export default HomePage;
