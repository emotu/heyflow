import JSONExplorer from "@app/components/explorer";

const demoJSON = {
    date: "2021-10-27T07:49:14.896Z",
    hasError: false,
    fields: [
        {
            id: "4c212130",
            prop: "iban",
            value: "DE81200505501265402568",
            hasError: false
        },
        {
            id: "4c212130",
            prop: "iban",
            value: "DE81200505501265402568",
            hasError: false
        },
        {
            id: "4c212130",
            prop: "iban",
            value: "DE81200505501265402568",
            hasError: false
        }
    ],
    name: "John Doe",
    age: 30,
    ranges: [25, 40, 72],
    hobbies: ["reading", "gaming", { type: "sports", examples: ["soccer", "basketball"] }, ["hockey", "baseball"]],
    address: {
        street: "123 Main St",
        city: "Somewhere",
        postalCode: {
            code: 12345,
            country: "Neverland"
        }
    },
    friends: [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 27, location: { city: "Wonderland", state: "Fantasy" } }
    ],
    nesting: {
        name: "John Doe",
        age: 30,
        hobbies: ["reading", "gaming", { type: "sports", examples: ["soccer", "basketball"] }],
        address: {
            street: "123 Main St",
            city: "Somewhere",
            postalCode: {
                code: 12345,
                country: "Neverland"
            }
        },
        friends: [
            { name: "Alice", age: 25 },
            { name: "Bob", age: 27, location: { city: "Wonderland", state: "Fantasy" } }
        ]
    }
};

const sampleJSON = {
    name: "John Doe",
    age: 30,
    hobbies: ["reading", "gaming", { type: "sports", examples: ["soccer", "basketball"] }],
    address: {
        street: "123 Main St",
        city: "Somewhere",
        postalCode: {
            code: 12345,
            country: "Neverland"
        }
    },
    friends: [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 27, location: { city: "Wonderland", state: "Fantasy" } }
    ]
};

export default function Home() {
    return (
        <div className="min-h-screen pb-20 space-y-12 font-[family-name:var(--font-geist-sans)]">
            <header className="h-16 sticky top-0 bg-white px-4 sm:px-8 w-full border-b border-gray-200 flex flex-row justify-between items-center">
                <div className="text-2xl font-bold tracking-tight">JSON Explorer</div>
            </header>
            <main className="flex flex-col mx-auto w-full max-w-screen-lg">
                <JSONExplorer initialData={sampleJSON} />
            </main>
        </div>
    );
}
