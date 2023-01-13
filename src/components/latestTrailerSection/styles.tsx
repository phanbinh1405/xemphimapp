import styled from "@emotion/styled";
import { Box } from "@mui/material";

interface TrailerContainerType {
	src?: string;
}

export const TrailerContainer = styled(Box)<TrailerContainerType>`
	padding-top: 20px;
	background-image: ${({ src }) =>
		src
			? `url(${src})`
			: `url(https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/tE6dWq9neq2IPSc6kJQdxyMrl7w.jpg)`};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	position: relative;
	&::before {
		content: "";
		position: absolute;
		background: linear-gradient(
			to right,
			rgba(3,37,65, 0.75) 0%,
			rgba(3,37,65, 0.75) 100%
		);
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
`;

export const PlayIcon = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 64px;
`
