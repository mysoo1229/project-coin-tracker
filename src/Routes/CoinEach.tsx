import { useLocation, useParams } from "react-router-dom";
import Header from "../Components/Header";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { styled } from "styled-components";

const Loading = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  
  svg path {
    stroke: ${(props) => props.theme.textColor};
  }
`;

const Summary = styled.summary`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const SummaryRank = styled.span`
  font-size: 50px;
  font-weight: bold;
`;

const SummaryPrice = styled.div`
  flex: 1;
  padding: 12px 16px;
  background: ${(props) => props.theme.fillColor};
  border-radius: 12px;
  text-align: center;
  font-size: 30px;
  line-height: 35px;
  font-weight: bold;

  span {
    font-weight: normal;
    font-size: 22px;
    vertical-align: 2px;
  }
`;

const SummaryImage = styled.div`
  flex-shrink: 0;
  width: 60px;
  
  img {
    width: 100%;
  }
`;

const Description = styled.div`
  padding: 24px 4px;
  font-size: 14px;
  line-height: 1.5;
`;

const Supply = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 30px;
  background: ${(props) => props.theme.fillColor};
  border-radius: 12px;
  text-align: center;
`;

const SupplyEach = styled.div`
  div {
    margin-top: 12px;
    font-size: 20px;
    font-weight: bold;
  }

  span {
    font-size: 12px;
    font-weight: normal;
    text-transform: uppercase;
  }
`;

interface IParam {
  coinId: string;
}
interface IRouteState {
  name: string;
}

interface ICoinInfo {
  name: string;
  rank: number;
  logo: string;
  description: string;
}

interface ICoinPrice {
  total_supply: number;
  max_supply: number;
  quotes: {
    USD: {
      price: number;
    }
  }
}

function CoinEach() {
  const { coinId } = useParams<IParam>();
  const { state } = useLocation<IRouteState>();
  const { isLoading: infoLoading, data: infoData } = useQuery<ICoinInfo>("coinInfo",  () => fetchCoinInfo(coinId));
  const { isLoading: priceLoading, data: priceData } = useQuery<ICoinPrice>("coinPrice", () => fetchCoinPrice(coinId));
  const isLoading = infoLoading || priceLoading;

  return (
    <>
      <Header
        title={
          state?.name ? state.name
          : isLoading ? "Loading..."
          : infoData?.name ? infoData.name
          : ""
        }
      />
      { isLoading ? (
        <Loading>
          <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 100 100"><path d="M10 50a40 40 0 1 1 80 0" style={{  fill: "none", strokeWidth: 8, }}><animateTransform attributeName="transform" attributeType="xml" dur="1s" from="0 50 50" repeatCount="indefinite" to="360 50 50" type="rotate" /></path></svg>
        </Loading>
      ) : (
        <>
          <Summary>
            <SummaryRank>{infoData?.rank}</SummaryRank>
            <SummaryPrice><span>$ </span>{priceData?.quotes.USD.price.toFixed(2)}</SummaryPrice>
            <SummaryImage>
              <img src={infoData?.logo} alt="logo" />
            </SummaryImage>
          </Summary>
          <Description>{infoData?.description}</Description>
          <Supply>
            <SupplyEach>
              <span>Total Supply</span>
              <div>{priceData?.total_supply}</div>
            </SupplyEach>
            <SupplyEach>
              <span>Max Supply</span>
              <div>{priceData?.max_supply}</div>
            </SupplyEach>
          </Supply>
        </>
      )}
    </>
  )
}

export default CoinEach;
