import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  render,
  within,
  screen,
  waitFor,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DialogMeet from "../home/DialogMeet";
import { HomePage, testId, textModel } from "../home/HomePage";

describe("Dialog create room", () => {
  test("test show dialog", async () => {
    // const component = render(<HomePage />);
    const component = render(
      <Router>
        <HomePage />
      </Router>
    );
    // const contentTitle = component.getByTestId('inside-testid');
    // await waitFor(() =>expect(contentTitle.textContent).toBe("Create a meeting room"));
    // // expect(within(document.body).getByTestId('inside-testid')).toHaveTextContent("Create a meeting room");
    // // expect(getByTestId('inside-testid')).toHaveTextContent("Create a meeting room")
  });






});
