import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Chart from "./pieChartItem";
import { ChartContainer } from "./styles";

export default function Item() {
	return (
		<Card
			sx={{ maxWidth: 345, border: "none", boxShadow: "none" }}
			className='keen-slider__slide'
		>
			<CardActionArea>
				<div style={{ position: "relative" }}>
					<CardMedia
						style={{ borderRadius: "8px" }}
						component='img'
						height='225'
						image='https://www.themoviedb.org/t/p/w220_and_h330_face/6ZfiG4P7jivJV0wgcNMSiS2Owhh.jpg'
						alt='green iguana'
					/>
					<ChartContainer>
						<Chart />
					</ChartContainer>
				</div>
				<CardContent
					sx={{ paddingTop: "26px", paddingInline: "10px", paddingBottom: 0 }}
				>
					<Typography
						gutterBottom
						variant='body1'
						component='div'
						sx={{ fontWeight: "700", margin: 0 }}
					>
						Travessia
					</Typography>
					<Typography
						gutterBottom
						variant='body1'
						component='div'
						sx={{ color: "rgba(0,0,0,0.6)" }}
					>
						Aug 22, 2022
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
