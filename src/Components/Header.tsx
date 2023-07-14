import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import iconHome from "../resources/icon-home.png";
import iconSun from "../resources/icon-sun.png";
import iconMoon from "../resources/icon-moon.png";
import styled from "styled-components";
import { isLightAtom } from "../atoms";

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

const ThemeButton = styled.button<{ $isLight: boolean }>`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translate3D(0, -50%, 0);
  width: 34px;
  height: 34px;
  background: ${(props) => props.theme.fillColor} no-repeat center / 20px auto;
  background-image: ${(props) => props.$isLight ? `url(${iconSun})` : `url(${iconMoon})`};
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 5px 2px ${(props) => props.theme.shadowColor};
  cursor: pointer;
`;

interface IHeaderProps {
  title: string;
  hasHomeLink?: boolean;
}

function Header({ title, hasHomeLink }: IHeaderProps) {
  const [isLight, setIsLight] = useRecoilState(isLightAtom);
  const toggleThemeColor = () => {
    setIsLight((current) => !current);
  };

  return (
    <HeaderWrap>
      { hasHomeLink !== false ? (
        <HomeLink>
          <Link to={"/"} />
        </HomeLink>
      ) : null }
      <Title>{title}</Title>
      <ThemeButton
        $isLight={isLight}
        onClick={toggleThemeColor}
      />
    </HeaderWrap>
  )
}

export default Header;
