import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JSONExplorer from "@app/app/components/explorer";

describe("JSONExplorer Component Tests", () => {
    const mockData = {
        name: "John",
        age: 30,
        hobbies: ["reading", "gaming"],
        address: {
            city: "New York",
            zip: "10001"
        }
    };

    it("renders without crashing", () => {
        render(<JSONExplorer initialData={mockData} />);
        expect(screen.getByText("Response")).toBeInTheDocument();
    });

    it("displays the initial JSON data structure", () => {
        render(<JSONExplorer initialData={mockData} />);
        expect(screen.getByText("name")).toBeInTheDocument();
        expect(screen.getByText('"John",')).toBeInTheDocument();
        expect(screen.getByText("age")).toBeInTheDocument();
        expect(screen.getByText("30,")).toBeInTheDocument();
        expect(screen.getByText("hobbies")).toBeInTheDocument();
        expect(screen.getByText(": [")).toBeInTheDocument();
        expect(screen.getByText('"reading",')).toBeInTheDocument();
        expect(screen.getByText('"gaming",')).toBeInTheDocument();
        expect(screen.getByText("address")).toBeInTheDocument();
        expect(screen.getByText(": {")).toBeInTheDocument();
        expect(screen.getByText("city")).toBeInTheDocument();
        expect(screen.getByText('"New York",')).toBeInTheDocument();
        expect(screen.getByText("zip")).toBeInTheDocument();
        expect(screen.getByText('"10001",')).toBeInTheDocument();
    });

    it("updates the property input when clicked", () => {
        render(<JSONExplorer initialData={mockData} />);
        const nameElement = screen.getByText("name");
        fireEvent.click(nameElement);
        const propertyInput = screen.getByLabelText("Property");
        expect(propertyInput).toHaveValue("res.name");
    });

    it("updates the property value when a valid path is entered", () => {
        render(<JSONExplorer initialData={mockData} />);
        const propertyInput = screen.getByLabelText("Property");
        fireEvent.change(propertyInput, { target: { value: "res.age" } });
        expect(propertyInput).toHaveValue("res.age");
        const propertyValue = screen.getByText("30");
        expect(propertyValue).toBeInTheDocument();
    });

    it("renders an empty value for an invalid property path", () => {
        render(<JSONExplorer initialData={mockData} />);
        const propertyInput = screen.getByLabelText("Property");
        fireEvent.change(propertyInput, { target: { value: "res.invalid" } });
        expect(propertyInput).toHaveValue("res.invalid");
        expect(screen.queryByText("undefined")).toBeInTheDocument();
    });

    it("renders arrays and objects properly", () => {
        render(<JSONExplorer initialData={mockData} />);
        expect(screen.getByText("[")).toBeInTheDocument();
        expect(screen.getByText("{")).toBeInTheDocument();
    });

    it("updates the variable input when modified", () => {
        render(<JSONExplorer initialData={mockData} />);
        const variableInput = screen.getByLabelText("Block / Variable");
        fireEvent.change(variableInput, { target: { value: "exampleVariable" } });
        expect(variableInput).toHaveValue("exampleVariable");
    });

    // it("does not crash with empty or undefined initial data", () => {
    //     render(<JSONExplorer />);
    //     expect(screen.getByText("Response")).toBeInTheDocument();
    //     expect(screen.queryByText("{")).not.toBeInTheDocument();
    //     expect(screen.queryByText("[")).not.toBeInTheDocument();
    // });
});
