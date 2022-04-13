import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { Header } from './HomeHeader';

const logoLabel = 'Unicorn';
describe('Name of the group', () => {
    test("check exist a label", async () => {
        const view = render(
            <Router>
                <Header />
            </Router>
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const contentTitle = view.getByTestId('logo-label');
        await waitFor(() => expect(contentTitle.textContent).toBe(`${logoLabel}`));
    });
});
