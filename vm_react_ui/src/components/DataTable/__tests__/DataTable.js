import React from 'react';
import { shallow } from 'enzyme';
import DataTableView, { checkout }  from "../DataTableView";
import Products from '../../../Pages/Home/__tests__/__data__/Products.json';

describe('DataTableView', () => {

    const props = {
        products: Products,
        runningTotal: 10,
        setLoadingBuy: jest.fn(),
        setRunningTotal: jest.fn(),
        loadingProducts: false,
        fetchProducts: jest.fn(),
        fetchCoins: jest.fn()
    }

    const view = shallow(<DataTableView {...props} />).dive();

    it('should render the DataTableView without issues', () => {
        expect(view).toMatchSnapshot();
    });

    it('should run checkout correctly', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({error: false, balance: 5 }),
            })
        );
        checkout(Products[2],10,props.setLoadingBuy, props.setRunningTotal, props.setRunningTotal, props.fetchProducts, props.fetchCoins)
        expect(props.setLoadingBuy).toHaveBeenCalledWith(true);
    });
});
