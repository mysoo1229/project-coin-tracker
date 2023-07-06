import Router from "./Router";
import GlobalStyle from './Styles/GlobalStyle';
import { ThemeProvider, styled } from 'styled-components';
import { theme } from './Styles/theme';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 20px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;
