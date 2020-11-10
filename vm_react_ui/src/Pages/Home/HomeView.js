import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import DataTable from '../../components/DataTable/DataTableView';
import './HomeStyles.css';

const HomeView = ({ functions, state }) => {
  //Destructuring
 // const object = {name:'Randell' , value:3}
  //const name = object.name
  //const {name} = object
  // 
    const { loadData, fetchCoins, fetchProducts, addCoins } = functions;
    const {
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
    } = state;

    return !loadingBuy && !reLoadingProducts && !reLoadingCoins ? (
        <Container className="main-container" style={{ paddingTop: '10px' }}>
            <Row>
                <Col>
                    <h3>Vending Machine</h3>
                </Col>
                <Col>
                    <h3>Balance: R{runningTotal}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable
                        products={products}
                        runningTotal={runningTotal}
                        setLoadingBuy={setLoadingBuy}
                        setRunningTotal={setRunningTotal}
                        loadingProducts={loadingProducts}
                        fetchProducts={fetchProducts}
                        fetchCoins={fetchCoins}
                    />
                </Col>
            </Row>
            <tbody>
            {!loadingCoins ? (
                coins.map(coin => (
                    <tc className="button-padding" key={coin.name}>
                        <Button disabled={coin.amount === 0} color="success" onClick={() => addCoins(coin.value)}>
                            Insert {coin.name} ({coin.amount})
                            <br />
                        </Button>
                    </tc>
                ))
            ) : (
                <div className="loader-coins">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                </div>
            )}
            </tbody>

            <br />
            <tbody>
            <tr>
                <Button id="ReloadProductsButton" className="btn-padding-right" color="success" onClick={fetchProducts}>
                    Refresh products
                </Button>

                <Button id="ReloadCoinsButton" className="btn-padding-right" color="success" onClick={() => {
                    fetchCoins();
                    setRunningTotal(0)
                }}>
                    Reload coins
                </Button>

                <Button id="ReloadAll" className="btn-padding-right" color="success" onClick={loadData}>
                    Refresh All
                </Button>

                <Button id="CancelButton" className="btn-padding-right" color="danger" onClick={() => { 
                    setRunningTotal(0); 
                    fetchCoins()}}>
                    Cancel
                </Button>
            </tr>
            </tbody>
        </Container>
    ) : (
        <div className="loader-container" id="HomeMainLoader">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        </div>
    );
};

export default HomeView;
