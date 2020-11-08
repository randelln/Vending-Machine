import React from 'react';
import { shallow } from 'enzyme';
import AppFooter from "../AppFooter";

describe('AppFooter', () => {
    const view = shallow(<AppFooter />);

    it('should render the AppFooter without issues', () => {
        expect(view).toMatchSnapshot();
    });
});
