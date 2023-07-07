import { Link } from "react-router-dom";
import iconHome from "../resources/icon-home.png";
import styled from "styled-components";

const HeaderWrap = styled.header`
  display: flex;
  position: relative;
  margin-bottom: 50px;
  justify-content: center;
`;

const HomeLink = styled.div`
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translate3D(0, -50%, 0);

  a {
    display: block;
    width: 34px;
    height: 34px;
    background: ${(props) => props.theme.fillColor} url(${iconHome}) no-repeat center 6px / 20px auto;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 5px 2px ${(props) => props.theme.shadowColor};
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

interface IHeaderProps {
  title: string;
  hasHomeLink?: boolean;
}

function Header({ title, hasHomeLink }: IHeaderProps) {
  return (
    <HeaderWrap>
      { hasHomeLink !== false ? (
        <HomeLink>
          <Link to={"/"} />
        </HomeLink>
      ) : null }
      <Title>{title}</Title>
    </HeaderWrap>
  )
}

export default Header;
