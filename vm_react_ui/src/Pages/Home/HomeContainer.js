import React, { useEffect, useState } from 'react';
import HomeView from './HomeView';
import { API_BASE_URL } from '../../constants';

//Makes API request, init - To know when the request is made the first time.

// setStateData - Will set the data that comes back from the API, sets the response to the state
//setDataReloading - Reloading the entire application
// setDataLoading -  Changes variable that is DataLoading
export const fetchData = (init, url, setStateData, setDataReloading, setDataLoading) => {
    init === true ? setDataReloading(true) : setDataLoading(true);
    fetch(url)
        .then(res => res.json())
        .then(response => {
            setTimeout(function(){init === true ? setDataReloading(false) : setDataLoading(false);
                setStateData(response)},3000)      
        })
        .catch(err => {
            window.alert(`An error has occurred ${err}`);
        });
};

// Updates the running total and decreases amount of coins available
// .map - For all coins inside the array, if this coin value equals my coin, decrease the coin amount
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
    //Gives back new array of coins after purchase
    setCoins(updatedCoins);
};
// Home Component - Creating state variables for rerendering
// States variables - Has the variable and the function to set the value. When function is called page will rerender
const HomeContainer = () => {
    const [products, setProducts] = useState([]);
    const [coins, setCoins] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCoins, setLoadingCoins] = useState(false);
    const [reLoadingProducts, setReLoadingProducts] = useState(false);
    const [reLoadingCoins, setReLoadingCoins] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [runningTotal, setRunningTotal] = useState(0);
// Needed both loading and reloading products for purpose of reloading sections of page
    const loadData = () => {
        fetchData(true, `${API_BASE_URL}/coins`, setCoins, setReLoadingCoins, setLoadingCoins);
        fetchData(true, `${API_BASE_URL}/products`, setProducts, setReLoadingProducts, setLoadingProducts);
        setRunningTotal(0)
    };
// LifeCycle method, first method that runs when app starts, normally used for API endpoint calls and fetching data from DB
    useEffect(() => {
        loadData();
    }, []);
//Passing down all props and functions to HomeView
// Homeview is a component, that accepts 2 props functions and state, which are objects
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
