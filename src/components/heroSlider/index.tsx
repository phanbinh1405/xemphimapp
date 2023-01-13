import React, { useState } from "react";
// import "./sliderStyle.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import {
	Banner,
	Button,
	ButtonContainer,
	FeaturedContainer,
	Infor,
} from "./styles";

function Arrow(props: {
	disabled: boolean;
	left?: boolean;
	onClick: (e: any) => void;
}) {
	const disabeld = props.disabled ? " arrow--disabled" : "";
	return (
		<svg
			onClick={props.onClick}
			className={`arrow ${
				props.left ? "arrow--left" : "arrow--right"
			} ${disabeld}`}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
		>
			{props.left && (
				<path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
			)}
			{!props.left && (
				<path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
			)}
		</svg>
	);
}

export default function HeroSlider() {
	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	return (
		<FeaturedContainer>
			<Banner
				src='https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
				alt=''
			/>
			<Infor className='info'>
				<img
					src='https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1'
					alt=''
				/>
				<p className='desc'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
					adipisci repellendus eum quasi illo, velit numquam, maxime tempora
					sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic repudiandae
					temporibus eum earum?
				</p>
				<ButtonContainer>
					<Button className='play'>
						<PlayArrow />
						<span>Play</span>
					</Button>
					<Button className='more'>
						<InfoOutlined />
						<span>Info</span>
					</Button>
				</ButtonContainer>
			</Infor>
		</FeaturedContainer>
	);
}
