import { render, screen } from "@testing-library/react";
import JSONExplorer from "@app/app/components/explorer";

// TODO: Write tests
describe("JSON Explorer Tests", () => {
    test("renders correctly", () => {
        render(<JSONExplorer initialData={{}} />);
    });
});
