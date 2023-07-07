import { useQuery } from "react-query";
import { fetchCoinHistory } from "../../api";
import ApexChart from "react-apexcharts";
import { styled } from "styled-components";
import { useRecoilValue } from 'recoil';
import { isLightAtom } from "../../atoms";

const Message = styled.div`
  margin-top: 40px;
  text-align: center;
`;

interface IChart {
  coinId: string;
}

interface ICoinHistory {
  close: string;
  time_close: number;
}

function LineChart({ coinId }: IChart) {
  const { isLoading, data } = useQuery<ICoinHistory[]>("coinHistory", () => fetchCoinHistory(coinId));
  const isLight = useRecoilValue(isLightAtom);

  return (
    <>
      { isLoading ? (
          <Message>Loading chart...</Message>
        ) : Array.isArray(data) ? (
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.slice(0, 14).map(item => parseFloat(item.close)) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isLight ? "light" : "dark"
              },
              chart: {
                width: 500,
                height: 300,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                borderColor: isLight ? "#ddd" : "#444",
                row: {
                  colors: undefined,
                  opacity: 0.3
                }
              },
              colors: [
                '#4692ff',
              ],
              stroke: {
                width: 4
              },
              xaxis: {
                axisTicks: {
                  show: false,
                },
                categories:
                  data?.slice(0, 14).map(item => 
                    new Date(item.time_close * 1000).toUTCString()
                  ) ?? [],
                type: "datetime",
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#66cc96"],
                  stops: [0, 80],
                }
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`
                }
              }
            }}
          />
        ) : (
          <Message>Sorry, the information is currently unavailable.</Message>
        )
      }
    </>
  )
}

export default LineChart;
