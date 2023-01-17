import styled from "@emotion/styled";

const FeaturedContainer = styled.div`
  /* height: 100vh; */
  position: relative;
`;

const Banner = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: center;
`;

const Infor = styled.div`
  width: 35%;
  position: absolute;
  left: 50px;
  bottom: 100px;
  color: white;
  display: flex;
  flex-direction: column;
  & > .desc {
    margin: 20px 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;

  &.play {
    background-color: white;
    color: #032541;
  }

  &.more {
    background-color: gray;
    color: white;
  }
`;

export { FeaturedContainer, Banner, Infor, Button, ButtonContainer };