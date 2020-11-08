import React from 'react';
import { shallow } from 'enzyme';
import HomeView from "../HomeView";
import Coins from './__data__/Coins.json';
import Products from './__data__/Products.json';

describe('HomeView', () => {

    const props = {
        functions: {
            loadData: jest.fn(),
            fetchCoins: jest.fn(),
            fetchProducts: jest.fn(),
            addCoins: jest.fn(),
        },
        state: {
            products: Products,
            coins: Coins,
            loadingProducts: false,
            loadingCoins: false,
            reLoadingProducts: false,
            reLoadingCoins: false,
            loadingBuy: false,
            setLoadingBuy: jest.fn(),
            runningTotal: 10,
            setRunningTotal: jest.fn(),
        }
    }

    const view = shallow(<HomeView {...props} />).dive();

    it('should render the HomeView without issues', () => {
        expect(view).toMatchSnapshot();
    });

    it('should have no loader when loading is false', () => {
        const loader = view.findWhere(el => el.props().id === 'HomeMainLoader');
        expect(loader).toHaveLength(0);
    });

    it('should have the loader when loading is true', () => {
        const negativeProps = props;
        negativeProps.state.loadingBuy = true;
        negativeProps.state.reLoadingProducts = true;
        negativeProps.state.reLoadingCoins = true;
        const view = shallow(<HomeView {...negativeProps} />);
        const loader = view.findWhere(el => el.props().id === 'HomeMainLoader');
        expect(loader).toHaveLength(1);
    });

    it('should call fetchProducts() when ReloadProductsButton is pressed', () => {
        view.findWhere(el => el.props().id === 'ReloadProductsButton').simulate('click');
        expect(props.functions.fetchProducts).toHaveBeenCalled();
    });

    it('should call fetchCoins() when ReloadCoinsButton is pressed', () => {
        view.findWhere(el => el.props().id === 'ReloadCoinsButton').simulate('click');
        expect(props.functions.fetchCoins).toHaveBeenCalled();
    });

    it('should call loadData() when ReloadAll is pressed', () => {
        view.findWhere(el => el.props().id === 'ReloadAll').simulate('click');
        expect(props.functions.loadData).toHaveBeenCalled();
    });

    it('should reset the running total when CancelButton is pressed', () => {
        view.findWhere(el => el.props().id === 'CancelButton').simulate('click');
        expect(props.state.setRunningTotal).toHaveBeenCalledWith(0);
    });
});
