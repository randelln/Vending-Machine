import React, { useEffect, useState } from 'react';
import HomeView from './HomeView';
import { API_BASE_URL } from '../../constants';


/**
 * Fetch data is function that accepts a url, makes an endpoint request, sets the response to state, and updates the loading varaibles
 * @param {boolean} init 
 * @param {string} url 
 * @param {Function} setStateData 
 * @param {Function} setDataReloading 
 * @param {Function} setDataLoading 
 */
export const fetchData = (init, url, setStateData, setDataReloading, setDataLoading) => {
    init === true ? setDataReloading(true) : setDataLoading(true);
    fetch(url)
        .then(res => res.json())
        .then(response => {
            setTimeout(function() {init === true ? setDataReloading(false) : setDataLoading(false);
                setStateData(response)},2000)      
        })
        .catch(err => {
            window.alert(`An error has occurred ${err}`);
        });
};

/**
 * addCoins is a function that updates the running total and decreases amount of coins available for the selected coin
 * @param {int} coinValue 
 * @param {Function} setRunningTotal 
 * @param {Array} coins 
 * @param {int} runningTotal 
 * @param {Function} setCoins 
 */
export const addCoins = (coinValue, setRunningTotal, coins, runningTotal, setCoins) => {
    setRunningTotal(runningTotal + coinValue);
    const updatedCoins = coins.map(coin =>
        coinValue === coin.value
            ? {
                name: coin.name,
                value: coin.value,
                amount: coin.amount - 1
            }
            : coin
    );
    setCoins(updatedCoins);
};
const HomeContainer = () => {
    const [products, setProducts] = useState([]);
    const [coins, setCoins] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCoins, setLoadingCoins] = useState(false);
    const [reLoadingProducts, setReLoadingProducts] = useState(false);
    const [reLoadingCoins, setReLoadingCoins] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [runningTotal, setRunningTotal] = useState(0);

    const loadData = () => {
        fetchData(true, `${API_BASE_URL}/coins`, setCoins, setReLoadingCoins, setLoadingCoins);
        fetchData(true, `${API_BASE_URL}/products`, setProducts, setReLoadingProducts, setLoadingProducts);
        setRunningTotal(0)
    };
// LifeCycle method, first method that runs when app starts, normally used for API endpoint calls and fetching data from DB
    useEffect(() => {
        loadData();
    }, []);

    return (
        <HomeView
            functions={{
                loadData,
                fetchCoins: () => {
                    fetchData(false, `${API_BASE_URL}/coins`, setCoins, setReLoadingCoins, setLoadingCoins);
                },
                fetchProducts: () => {
                    fetchData(false, `${API_BASE_URL}/products`, setProducts, setReLoadingProducts, setLoadingProducts);
                },
                addCoins: coinValue => {
                    addCoins(coinValue, setRunningTotal, coins, runningTotal, setCoins);
                }
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
