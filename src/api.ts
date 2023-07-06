const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoinList() {
  return fetch(`${BASE_URL}/coins`).then((response) => 
    response.json()
  );
}
