import { render, screen } from "@testing-library/react";
import React from "react";
import { Header1, Header2, Header3 } from "./Header";

describe("HTML header tests", () => {
    test("should render H1 correctly with props", async () => {
        render(<Header1 style={{ color: "green" }}>Header 1</Header1>);
        const heading1 = screen.getByRole("heading", { level: 1 });
        const style = window.getComputedStyle(heading1);

        expect(heading1.innerHTML).toBe("Header 1");
        expect(style.color).toBe("green");
    });

    test("should render H2 correctly with props", async () => {
        render(<Header2 style={{ color: "blue" }}>Header 2</Header2>);
        const heading2 = screen.getByRole("heading", { level: 2 });
        const style = window.getComputedStyle(heading2);

        expect(heading2.innerHTML).toBe("Header 2");
        expect(style.color).toBe("blue");
    });

    test("should render H3 correctly with props", async () => {
        render(<Header3 style={{ color: "red" }}>Header 3</Header3>);
        const heading3 = screen.getByRole("heading", { level: 3 });
        const style = window.getComputedStyle(heading3);

        expect(heading3.innerHTML).toBe("Header 3");
        expect(style.color).toBe("red");
    });
});
