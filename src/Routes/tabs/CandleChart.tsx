import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../../api";
import styled from "styled-components";

const Message = styled.div`
  margin-top: 40px;
  text-align: center;
`;

interface ICoinHistory {
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  error?: string;
}

interface ChartProps {
  coinId: string;
}

function CandleChart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<ICoinHistory[]>("coinHistory", () => fetchCoinHistory(coinId));

  return <>
    {isLoading ? (
        <Message>Loading chart...</Message>
      ) : Array.isArray(data) ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.slice(0, 14).map((item) => {
                return {
                  x: new Date(item.time_close * 1000).toUTCString(),
                  y:
                    [
                      parseFloat(item.open),
                      parseFloat(item.high),
                      parseFloat(item.low),
                      parseFloat(item.close),
                    ]
                }
              })
            }
          ]}
          options={{
            theme: {
              mode: "light"
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
              borderColor: "#ddd",
              row: {
                colors: undefined,
                opacity: 0.3
              }
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#66cc96',
                  downward: '#4692ff',
                }
              }
            },
            stroke: {
              width: 2
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              categories:
                data?.slice(0, 14).map(item => 
                  new Date(item.time_close * 1000).toUTCString()
                ),
              type: "datetime",
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
  </>;
}

export default CandleChart;
