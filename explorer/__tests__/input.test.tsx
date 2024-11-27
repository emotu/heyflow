import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@app/app/components/input";

describe("Input Component", () => {
    it("renders correctly with label and placeholder", () => {
        render(
            <Input label="Username" name="username" value="" placeholder="Enter your username" onChange={jest.fn()} />
        );
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    });

    it("displays the correct value", () => {
        render(<Input label="Email" name="email" value="test@example.com" onChange={jest.fn()} />);
        expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    });

    it("calls the onChange handler with the correct value", () => {
        const handleChange = jest.fn();
        render(<Input label="Password" name="password" value="" onChange={handleChange} />);
        const input = screen.getByLabelText("Password");
        fireEvent.change(input, { target: { value: "newpassword" } });
        expect(handleChange).toHaveBeenCalledWith("newpassword");
    });

    it("renders the propertyValue when provided", () => {
        render(<Input label="Info" name="info" value="" propertyValue="Additional info" onChange={jest.fn()} />);
        expect(screen.getByText("Additional info")).toBeInTheDocument();
    });

    it("applies the correct default type", () => {
        render(<Input label="Default Type" name="default" value="" onChange={jest.fn()} />);
        expect(screen.getByLabelText("Default Type")).toHaveAttribute("type", "text");
    });

    it("applies a custom type when specified", () => {
        render(<Input label="Password" name="password" value="" type="password" onChange={jest.fn()} />);
        expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    });
});
