import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
	LeftContainer,
	NavBar,
	NavBarInnerContainer,
	NavBarLogo,
	OptionsContainer,
	Profile,
	RightContainer,
} from "./style";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setIsScrolled(window.pageYOffset === 0 ? false : true);
		});
		return () => {
			window.removeEventListener("scroll", () => {
				setIsScrolled(window.pageYOffset === 0 ? false : true);
			});
		};
	});

	return (
		<NavBar isScrolled={isScrolled}>
			<NavBarInnerContainer>
				<LeftContainer>
					<NavBarLogo src='/logo-full.png' alt='' width={100} height={25} />
					<span>Homepage</span>
					<span>Series</span>
					<span>Movies</span>
					<span>New and Popular</span>
					<span>My List</span>
				</LeftContainer>
				<RightContainer>
					<SearchIcon className='icon' />
					{/* <span>KID</span> */}
					<NotificationsIcon className='icon' />
					{/* <Image
						src='https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
						alt=''
					/> */}
					<Profile>
						<ArrowDropDownIcon className='icon' />
						<OptionsContainer className='options'>
							<span style={{ padding: 10, cursor: "pointer" }}>Settings</span>
							<span style={{ padding: 10, cursor: "pointer" }}>Logout</span>
						</OptionsContainer>
					</Profile>
				</RightContainer>
			</NavBarInnerContainer>
		</NavBar>
	);
};

export default Navbar;
