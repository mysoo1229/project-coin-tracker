import { useQuery } from "react-query";
import Header from "../Components/Header";
import { fetchCoinList } from "../api";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Loading = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  
  svg path {
    stroke: ${(props) => props.theme.textColor};
  }
`;

const List = styled.ul`
  display: grid;
	grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
`;

const Item = styled.li`
  padding: 20px 10px 17px;
  box-sizing: border-box;
  background: ${(props) => props.theme.fillColor};
  border-radius: 16px;
  text-align: center;
`;

const ItemLogo = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto 15px;
  
  img {
    width: 100%;
  }
`;

const ItemName = styled.div`
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

interface ICoinProps {
  id: string;
  name: string;
  symbol: string;
}

function CoinList() {
  const { isLoading, data } = useQuery<ICoinProps[]>("coinList", fetchCoinList);

  return (
    <>
      <Header />
      { isLoading ? (
        <Loading>
          <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 100 100"><path d="M10 50a40 40 0 1 1 80 0" style={{  fill: "none", strokeWidth: 8, }}><animateTransform attributeName="transform" attributeType="xml" dur="1s" from="0 50 50" repeatCount="indefinite" to="360 50 50" type="rotate" /></path></svg>
        </Loading>
      ) : (
        <List>
          {data?.slice(0, 15).map(coin => (
            <Item key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name }
                }}>
                <ItemLogo>
                  <img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                </ItemLogo>
                <ItemName>{coin.name}</ItemName>
              </Link>
            </Item>
          ))}
        </List>
      )}
    </>
  )
}

export default CoinList;
