import { useQuery } from "react-query";
import { fetchCoinPrice } from "../../api";
import styled from "styled-components";

const Message = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const PriceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
  gap: 20px;
`;

const PriceItem = styled.li`
  flex-shrink: 0;
  background: ${props => props.theme.fillColor};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const PriceType = styled.h3`
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.3;
`;

const PriceValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fa5c5c;

  &.negative {
    color: ${props => props.theme.accentColor};
  }
`;

interface PriceProps {
  coinId: string;
}

interface ICoinPrice {
  quotes: {
    USD: {
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_1y: number;
    };
  }
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<ICoinPrice>(
    "coinPrice",
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const checkUpDown = (value: any) => {
    if (value < 0) {
      return 'negative';
    }
  };

  return (
    <>
      {
        isLoading ? (
          <Message>Loading price...</Message>
        ) : (
          <PriceList>
            <PriceItem>
              <PriceType>Since<br />1 hour ago</PriceType>
              <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_1h)}>
                {data?.quotes.USD.percent_change_1h}%
              </PriceValue>
            </PriceItem>
            <PriceItem>
              <PriceType>Since<br />1 day ago</PriceType>
              <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_24h)}>
                {data?.quotes.USD.percent_change_24h}%
              </PriceValue>
            </PriceItem>
            <PriceItem>
              <PriceType>Since<br />1 month ago</PriceType>
              <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_30d)}>
                {data?.quotes.USD.percent_change_30d}%
              </PriceValue>
            </PriceItem>
            <PriceItem>
              <PriceType>Since<br />1 year ago</PriceType>
              <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_1y)}>
                {data?.quotes.USD.percent_change_1y}%
              </PriceValue>
            </PriceItem>
          </PriceList>
        )
      }
    </>
  );
}

export default Price;
