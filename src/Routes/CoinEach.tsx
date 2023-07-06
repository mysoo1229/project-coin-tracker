import { useParams } from "react-router-dom";
import Header from "../Components/Header";

function CoinEach() {
  const { coinId } = useParams<{coinId: string}>()
  return (
    <>
      <Header />
      {coinId}
    </>
  )
}

export default CoinEach;
