import { render, screen } from "@testing-library/react";
import Buttons, { MiniButton } from "@app/app/components/buttons";

// TODO: Write tests
describe("Button Tests", () => {
    test("Button renders correctly", () => {
        render(<Buttons />);
    });
    test("MiniButton renders correctly", () => {
        render(<MiniButton />);
    });
});
