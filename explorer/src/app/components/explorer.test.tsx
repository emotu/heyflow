import { render, screen } from "@testing-library/react";
import JSONExplorer from "./explorer";

describe("JSON Explorer Tests", () => {
    it("renders correctly", () => {
        render(<JSONExplorer initialData={{}} />);
    });
});
