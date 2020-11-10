import React from 'react';
import { Table, Button } from 'reactstrap';
import { API_BASE_URL } from '../../constants';
import './DataTableStyles.css';

//Same as home container
export const checkout = (product, runningTotal, setLoadingBuy, setRunningTotal, fetchProducts, fetchCoins) => {
    if (product.price > runningTotal) {
        window.alert('Not enough funds');
    } else if (product.quantity == 0) {
        window.alert(`No ${product.name} avaliable. Coins have been refunded`);
    } else {
        setLoadingBuy(true);
        fetch(`${API_BASE_URL}/buy/${product.id}/${runningTotal}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                setLoadingBuy(false);
                if (!response.error) {
                    window.alert(`Purchase of ${product.name} successful, coins refunded is R${response.balance}`);
                    setRunningTotal(0);
                    fetchProducts();
                    fetchCoins();
                } else {
                    window.alert('Purchase unsuccessful');
                    setRunningTotal(response.balance);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};
// function that accepts these props
const DataTable = ({
                       products,
                       runningTotal,
                       setLoadingBuy,
                       setRunningTotal,
                       loadingProducts,
                       fetchProducts,
                       fetchCoins
                   }) => {
    const items = products || []; // If products is undefined, pass empty array
    return (
        <Table striped>
            <thead className="thead-dark">
            <tr>
                <th>Name</th>
                <th>Volume</th>
                <th>Quantity</th>
                <th>Price</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {!loadingProducts ? (
                !items || items.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>No Products yet</b>
                        </td>
                    </tr>
                ) : (
                    items.map(item => (
                        <tr key={item.id}>
                            <th scope="row">{item.name}</th>
                            <td>{item.volume}</td>
                            <td>{item.quantity}</td>
                            <th>R{item.price}</th>
                            <td align="center">
                                <div>
                                    <Button
                                        id={`${item.id}Button`}
                                        color="success"
                                        onClick={() =>
                                            checkout(item, runningTotal, setLoadingBuy, setRunningTotal, fetchProducts, fetchCoins)
                                        }
                                    >
                                        Buy
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))
                )
            ) : (
                <div className="loader-container">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                </div>
            )}
            </tbody>
        </Table>
    );
};

export default DataTable;
