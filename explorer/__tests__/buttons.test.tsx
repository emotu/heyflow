import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { MiniButton } from "@app/app/components/buttons";

// Test for Buttons component
describe("Button Component", () => {
    it("renders correctly with children", () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByRole("button")).toHaveTextContent("Click Me");
    });

    it("applies the correct default class", () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByRole("button")).toHaveClass(
            "flex font-medium cursor-pointer text-gray-500 transition-colors ease-in-out duration-150 hover:text-blue-600 flex-row justify-center items-start space-x-2"
        );
    });

    it("calls the onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

// Test for MiniButton component
describe("MiniButton Component", () => {
    it("renders correctly with children", () => {
        render(<MiniButton>+</MiniButton>);
        expect(screen.getByRole("button")).toHaveTextContent("+");
    });

    it("applies the correct default class", () => {
        render(<MiniButton>+</MiniButton>);
        expect(screen.getByRole("button")).toHaveClass(
            "w-9 h-9 flex flex-col flex-shrink-0 justify-center items-center transition-colors ease-in-out duration-150 hover:text-blue-600"
        );
    });

    it("calls the onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<MiniButton onClick={handleClick}>+</MiniButton>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
