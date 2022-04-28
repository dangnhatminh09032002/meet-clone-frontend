import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { HomePage, testId, textModel } from "../home/HomePage";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import userEvent from "@testing-library/user-event";
import DialogMeet from "../home/DialogMeet";

describe("home", () => {
  configure({ adapter: new Adapter() });

  // test("test text lable", async () => {
  //   const component = render(
  //     <Router>
  //       <HomePage />
  //     </Router>
  //   );

  //   const contentTitle = component.getByTestId(testId.titleH1);
  //   await waitFor(() =>expect(contentTitle.textContent).toBe(textModel.titleH1));
  //   const titlep = component.getByTestId(testId.titlep);
  //   await waitFor(() => expect(titlep.textContent).toBe(textModel.titlep));
  //   const btnNewMeet = component.getByTestId(testId.btnNewMeeting);
  //   await waitFor(() =>expect(btnNewMeet.textContent).toBe(textModel.btnNewMeeting));
  //   const btnJoin = component.getByTestId(testId.btnJoin);
  //   await waitFor(() => expect(btnJoin.textContent).toBe(textModel.btnJoin));
  //   const aHelpText = component.getByTestId(testId.aHelpText);
  //   await waitFor(() => expect(aHelpText.textContent).toBe(textModel.aHelpText));

  // });

  // test("test click event", async () => {
  //   const handleClickPopover = jest.fn();
  //   const btnNewMeeting = shallow(
  //     <button
  //       className="btn green"
  //       onClick={handleClickPopover}
  //       data-testid={testId.btnNewMeeting}
  //     >
  //       {textModel.btnNewMeeting}
  //     </button>
  //   );
  //   btnNewMeeting.find("button").simulate("click");
  //   expect(handleClickPopover.mock.calls.length).toEqual(1);
  // });

  // test("test click create room", async () => {
  //   const handleClickCreateMeet = jest.fn();
  //   const btnNewMeeting = shallow(
  //     <button
  //       className="btn-conversations"
  //       data-testid={testId.btnCreateMeetingLater}
  //     >
  //       {textModel.btnCreateMeetingLater}
  //     </button>
  //   );
  //   btnNewMeeting.find("button").simulate("click");
  //   expect(handleClickCreateMeet.mock.calls.length).toEqual(0);
  // });

  // test("test click join room", async () => {
  //   const handleClickJoin = jest.fn();
  //   const btnNewMeeting = shallow(
  //     <button
  //       className="btn no-bg btn-join"
  //       data-testid={testId.btnJoin}
  //     >
  //       {textModel.btnJoin}
  //     </button>
  //   );
  //   btnNewMeeting.find("button").simulate("click");
  //   expect(handleClickJoin.mock.calls.length).toEqual(0);
  // });

  test('modal opening', async () => {
    const component = render(
      <Router>
         <HomePage />
      </Router>
    );

    // const showDialog = component.getByTestId(testId.btnCreateMeetingLater);

    // fireEvent.click(showDialog);


        // expect(baseElement).toMatchSnapshot(); // added snapshot
  
    // await waitFor(() => expect(queryByText('Modal title')).toBeInTheDocument());
  });
  





  // test("should close when esc key is pressed", async () => {
  //   const component = render(
  //     <Router>
  //       <HomePage />
  //     </Router>
  //   );
  //   userEvent.click(screen.getByTestId(testId.btnNewMeeting));
  //   await waitFor(() => expect(textModel.btnCreateMeetingLater).toBeTruthy());
  //   userEvent.keyboard("{esc}");
  //   await expect(screen.queryByText(textModel.btnCreateMeetingLater)).not.toBeInTheDocument();
  // });

  // test("It renders some create meeting later", async () => {
  //   const component = render(
  //     <Router>
  //       <HomePage />
  //     </Router>
  //   );
  //   const button = component.getByTestId(testId.btnNewMeeting);
  //   fireEvent.click(button);

  //   // userEvent.click(screen.getByTestId(testId.btnNewMeeting));
  //   // const btnCreateMeetingLater = component.getByTestId(testId.btnCreateMeetingLater);
  //   // await waitFor(() => expect(btnCreateMeetingLater.textContent).toBe(textModel.btnCreateMeetingLater));
  // });

  // test("test value of input", () => {
  //   const component = render(
  //     <Router>
  //       <HomePage />
  //     </Router>
  //   );
  //   const inputEnterCode = component.getByTestId(testId.inputEnterCode);
  //   fireEvent.click(inputEnterCode, { target: { value: "abcdgh" } });
  // });

  // it("should render input element", () => {
  //   render(<input placeholder="Enter a code or link" />);
  //   const inputElement = screen.getByPlaceholderText(/Enter a code or link/i);
  //   expect(inputElement).toBeInTheDocument();
  // });

  // it("should be able to type into input", () => {
  //   render(<input placeholder="Enter a code or link" />);
  //   const inputElement = screen.getByPlaceholderText(/Enter a code or link/i) as HTMLInputElement;
  //   fireEvent.click(inputElement);
  //   fireEvent.change(inputElement, {
  //     target: { value: "abc-xyz" },
  //   });
  //   expect(inputElement.value).toBe("abc-xyz");
  // });

  // test("renders an image", () => {
  //   const imgContent = shallow(<img src={textModel.imgContent} alt="" />);
  //   expect(imgContent.html()).toEqual(
  //     '<img src="https://res.cloudinary.com/boo-it/image/upload/v1648690218/test/fgvvdhwkoowj5xcdqqzt.png" alt=""/>'
  //   );
  // });
});
