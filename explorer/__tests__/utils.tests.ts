import { getObjectValue } from "@app/app/utils";

describe("getObjectValue", () => {
    it("retrieves the value from a simple object path", () => {
        const obj = { name: "Emotu", age: 39 };
        expect(getObjectValue(obj, "name")).toBe("Emotu");
        expect(getObjectValue(obj, "age")).toBe(39);
    });

    it("retrieves the value from a nested object path", () => {
        const obj = { user: { profile: { username: "emotu.balogun" } } };
        expect(getObjectValue(obj, "user.profile.username")).toBe("emotu.balogun");
    });

    it("retrieves the value from an array within an object", () => {
        const obj = { hobbies: ["reading", "gaming", "coding"] };
        expect(getObjectValue(obj, "hobbies[0]")).toBe("reading");
        expect(getObjectValue(obj, "hobbies[2]")).toBe("coding");
    });

    it("returns undefined for an invalid path", () => {
        const obj = { name: "Emotu", age: 39 };
        expect(getObjectValue(obj, "address")).toBeUndefined();
        expect(getObjectValue(obj, "name.first")).toBeUndefined();
    });

    it("returns undefined for an empty object or undefined input", () => {
        expect(getObjectValue({}, "name")).toBeUndefined();
        expect(getObjectValue(undefined, "name")).toBeUndefined();
    });

    it("handles paths with mixed arrays and objects", () => {
        const obj = {
            users: [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" }
            ]
        };
        expect(getObjectValue(obj, "users[1].name")).toBe("Bob");
    });

    it("returns undefined for invalid array indices", () => {
        const obj = { items: [1, 2, 3] };
        expect(getObjectValue(obj, "items[5]")).toBeUndefined();
    });

    it("handles objects with numeric keys", () => {
        const obj = { 0: "zero", 1: "one" };
        expect(getObjectValue(obj, "[0]")).toBe("zero");
        expect(getObjectValue(obj, "[1]")).toBe("one");
    });
});
