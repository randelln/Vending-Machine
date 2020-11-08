import React from 'react';
import { shallow } from 'enzyme';
import HomeContainer, { fetchData, addCoins } from "../HomeContainer";
// describe statement - Describes what is being tested
describe('HomeContainer', () => {
    const homeContainer = shallow(<HomeContainer />).dive();
// unit test, (what you are testing, testing a view)
    it('should render the HomeContainer without issues', () => {
        expect(homeContainer).toMatchSnapshot(); // Expect statement, what do you expect to happem. Snapshot - a picture of what your code looks like in code
    });

    describe('fetchdata()', () => {
        const url = '/someApi';
        const setStateData = jest.fn(); // Fake function to mock for test
        const setDataReloading = jest.fn();
        const setDataLoading = jest.fn();

        it('should set the reloading variable to true when init is true', () => {
            fetchData(true,url,setStateData,setDataReloading,setDataLoading)
            expect(setDataReloading).toHaveBeenCalledWith(true);
        });

        it('should set the data loading variable to true when init is false', () => {
            fetchData(false,url,setStateData,setDataReloading,setDataLoading)
            expect(setDataLoading).toHaveBeenCalledWith(true);
        });

        it('should call /someApi and then set the data state', () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve([{name: 'R5', value: '5'}]),
                })
            );
            fetchData(true,url,setStateData,setDataReloading,setDataLoading)
            expect(fetch).toHaveBeenCalledWith(url);
            expect(setDataReloading).toHaveBeenCalledWith(true);
        });
    });

    describe('addCoins()', () => {
        const coinValue = 5;
        const setRunningTotal = jest.fn();
        const coins = [{name: 'R5', value: 5, amount: 4}, {name: 'R2', value: 2, amount: 2}];
        const runningTotal = 21;
        const setCoins = jest.fn();

        it('should set the running total and decrease the correct coins quantity', () => {
            addCoins(coinValue, setRunningTotal, coins, runningTotal, setCoins)
            expect(setRunningTotal).toHaveBeenCalledWith(26);
            expect(setCoins).toHaveBeenCalledWith([{"amount": 3, "name": "R5", "value": 5}, {"amount": 2, "name": "R2", "value": 2}]);
        });
    });
});
