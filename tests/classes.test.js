import { createShortTitle } from "../src/plugins/classes.js";

test("Markdown link followed by text", () => {
    expect(
        createShortTitle("[MADR](https://adr.github.io/madr/) 2.1.2 – The Markdown Architectural Decision Records")
    ).toBe("MADR 2.1.2");
});

test("Markdown link preceded by text", () => {
    expect(createShortTitle("Include in [adr-tools](https://github.com/npryce/adr-tools)")).toBe(
        "Include in adr-tools"
    );
});

test("Wrong balancing of brackets", () => {
    expect(createShortTitle("Include in [adr-tools](https://github.com/npryce/adr-tools")).toBe(
        "Include in [adr-tools](https://github.com/npryce/adr-tools"
    );
});

test("Single closing brace", () => {
    expect(createShortTitle("Con. Opt 1)")).toBe("Con. Opt 1)");
});
