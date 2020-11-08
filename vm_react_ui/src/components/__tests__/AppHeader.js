import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from "../AppHeader";

describe('AppHeader', () => {
    const view = shallow(<AppHeader />);

    it('should render the AppHeader without issues', () => {
        expect(view).toMatchSnapshot();
    });
});
