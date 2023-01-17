import styled from "@emotion/styled";
import Image from "next/image";

interface NavBarType {
  isScrolled: boolean;
}

export const NavBar = styled.div<NavBarType>`
  width: 100%;
  color: white;
  font-size: 16px;
  position: fixed;
  top: 0;
  z-index: 999;
  background: ${({ isScrolled }) =>
    isScrolled
      ? `#032541`
      : `linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.3) 50%)`};
`;

export const NavBarInnerContainer = styled.div`
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

export const NavBarLogo = styled(Image)`
  margin-right: 40px;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-right: 20px;
    cursor: pointer;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Profile = styled.div`
  &:hover {
    .options {
      display: flex;
      flex-direction: column;
      position: absolute;
    }
  }
`;

export const OptionsContainer = styled.div`
  display: none;
  background-color: #032541;
  border-radius: 5px;
`;