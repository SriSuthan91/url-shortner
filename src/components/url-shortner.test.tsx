import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlShortner from "./url-shortner";

describe("when empty input field is passed", () => {
it("should show error message when the input field is not entered", async () => {
    render(<UrlShortner />);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    screen.debug();
});
});

describe("when button is pressed", () => {
it('display shortner url', () => {
    render(<UrlShortner />);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    expect(screen.getByTestId("shorten-url")).toHaveTextContent("shortner_url");
  });
});

