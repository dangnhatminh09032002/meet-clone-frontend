
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { HomePage } from "./HomePage";

test("test text lable", async () => {
    const component = render(
        <Router>
            <HomePage />
        </Router>
    );
    const contentTitle = component.getByTestId("test");
    await waitFor(() => expect(contentTitle.textContent).toBe("Premium video meetings. Now free for everyone."));
    const content = component.getByTestId("testp");
    await waitFor(() => expect(content.textContent).toBe("Unicorn for you, We re here to help you connect, communicate, and express your ideas so you can get more done together."));
    
});

