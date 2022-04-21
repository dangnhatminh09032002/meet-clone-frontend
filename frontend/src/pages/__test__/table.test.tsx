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
import { Table } from "@mui/material";
import { TableRoom } from "../../components/TableRoom/TableRoom";

describe("Dialog create room", () => {
  test("test table", async () => {
    // const component = render(<TableRoom />);
    // const table = component.find('table');

    // const contentTitle = component.getByTestId('inside-testid');
    // await waitFor(() =>expect(contentTitle.textContent).toBe("Create a meeting room"));
  });


});