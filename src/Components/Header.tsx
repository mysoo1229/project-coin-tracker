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

interface IHeaderProps {
  title: string;
}

function Header({ title }: IHeaderProps) {
  return (
    <HeaderWrap>
      <Title>{title}</Title>
    </HeaderWrap>
  )
}

export default Header;
