import { render, screen } from "@testing-library/react";
import { YellowButton } from "./YellowButton";

describe("HTML header tests", () => {
    test("should render H1 correctly with props", async () => {
        render(<YellowButton text="test" tabIndex={4} isDisabled={true} />);
        const button = screen.getByRole("button", { name: /test/i });

        expect(button.innerHTML).toBe("test");
        expect(button).toHaveAttribute("tabIndex", "4");
        expect(button).toBeDisabled();
    });
});
