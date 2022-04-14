import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from './HomeHeader';

const logoLabel = 'Unicorn';
configure({ adapter: new Adapter() });
describe('Name of the group', () => {
    test('check exist a label', async () => {
        const view = render(
            <Router>
                <Header />
            </Router>
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const contentTitle = view.getByTestId('logo-label');
        await waitFor(() => expect(contentTitle.textContent).toBe(`${logoLabel}`));
    });
    it('Test click event', () => {
        const mockCallBack = jest.fn();
        const button = shallow((<button onClick={mockCallBack}>Login</button>));
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
    test('show sub-menu when user logged click avatar', () => {

    });
});
