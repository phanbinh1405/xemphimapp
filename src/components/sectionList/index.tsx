import { Box } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import React from "react";
import Item from "../sectionItem";

function SectionList({title = `What's Popular`}: any) {
	const [ref] = useKeenSlider<HTMLDivElement>({
		breakpoints: {
			"(min-width: 400px)": {
				slides: { perView: 2, spacing: 5 },
			},
			"(min-width: 1000px)": {
				slides: { perView: 7.5, spacing: 20 },
			},
		},
		slides: { perView: 1 },
	});
	return (
		<Box style={{ paddingTop: 30 }} >
			<h2 style={{marginBottom: 20, fontWeight: '600', paddingInline: 40}}>{title}</h2>

			<Box ref={ref} className='keen-slider' pb={2.5} >
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
			</Box>
		</Box>
	);
}

export default SectionList;
