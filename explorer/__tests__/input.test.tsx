import { render, screen } from "@testing-library/react";
import Input from "@app/app/components/input";

// TODO: Write tests needed
describe("Input Tests", () => {
    test("renders correctly", () => {
        let value: string | undefined = "";
        render(<Input name={"sample"} label={"Sample"} value={value} onChange={(v) => (value = v)} />);
    });
});
