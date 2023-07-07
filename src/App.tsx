import Router from "./Router";
import GlobalStyle from './Styles/GlobalStyle';
import { useRecoilValue } from 'recoil';
import { ThemeProvider, styled } from 'styled-components';
import { lightTheme, darkTheme } from './Styles/theme';
import { isLightAtom } from "./atoms";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 20px;
`;

function App() {
  const isLight = useRecoilValue(isLightAtom);

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;
