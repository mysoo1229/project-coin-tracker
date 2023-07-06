import styled from "styled-components";

const HeaderWrap = styled.header`
  display: flex;
  position: relative;
  padding-bottom: 50px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

function Header() {
  return (
    <HeaderWrap>
      <Title>Coin Tracker</Title>
    </HeaderWrap>
  )
}

export default Header;
