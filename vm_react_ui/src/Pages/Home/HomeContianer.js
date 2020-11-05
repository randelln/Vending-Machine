import React, { useEffect, useState } from 'react';
import HomeView from './HomeView';
import { API_BASE_URL } from '../../constants';

const HomeContainer = () => {
  const [products, setProducts] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCoins, setLoadingCoins] = useState(false);
  const [reLoadingProducts, setReLoadingProducts] = useState(false);
  const [reLoadingCoins, setReLoadingCoins] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [runningTotal, setRunningTotal] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetchCoins(true);
    fetchProducts(true);
  };

  const fetchCoins = (init) => {
    init === true ? setReLoadingCoins(true) : setLoadingCoins(true);
    fetch('https://localhost:44383/vm/coins')
      .then((res) => res.json())
      .then((response) => {
        init === true ? setReLoadingCoins(false) : setLoadingCoins(false);
        setCoins(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProducts = (init) => {
    init === true ? setReLoadingProducts(true) : setLoadingProducts(true);
    fetch('https://localhost:44383/vm/products', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((response) => {
        init === true ? setReLoadingProducts(false) : setLoadingProducts(false);
        setProducts(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCoins = (coinValue) => {
    setRunningTotal(runningTotal + coinValue);
    const updatedCoins = coins.map(coin => coinValue === coin.value 
        ? {
            name: coin.name,
            value: coin.value,
            amount: coin.amount - 1
          } : coin
    );
    setCoins(updatedCoins)
  };
  return (
    <HomeView
      functions={{
        loadData,
        fetchCoins,
        fetchProducts,
        addCoins
      }}
      state={{
        products,
        coins,
        loadingProducts,
        loadingCoins,
        reLoadingProducts,
        reLoadingCoins,
        loadingBuy,
        setLoadingBuy,
        runningTotal,
        setRunningTotal
      }}
    />
  );
};

export default HomeContainer;
