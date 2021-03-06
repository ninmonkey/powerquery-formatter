// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "mocha";
import { compare, expectFormat } from "./common";

describe("comment serialize", () => {
    // --------------------------------------
    // ---------- RecordExpression ----------
    // --------------------------------------
    describe("RecordExpression", () => {
        it("[ /*foo*/ key1=value1, key2=value2 ]", () => {
            const expected: string = `
[
    /*foo*/ key1 = value1,
    key2 = value2
]`.trim();
            const actual: string = expectFormat("[ /*foo*/ key1=value1, key2=value2 ]");
            compare(expected, actual);
        });

        it("[ /*foo*//*bar*/ key1=value1, key2=value2 ]", () => {
            const expected: string = `
[
    /*foo*//*bar*/ key1 = value1,
    key2 = value2
]`.trim();
            const actual: string = expectFormat("[ /*foo*//*bar*/ key1=value1, key2=value2 ]");
            compare(expected, actual);
        });

        it("[ key1=/*foo*/value1, key2=value2 ]", () => {
            const expected: string = `
[
    key1 = /*foo*/ value1,
    key2 = value2
]`.trim();
            const actual: string = expectFormat("[ key1=/*foo*/value1, key2=value2 ]");
            compare(expected, actual);
        });

        it("[ // foo\\n key1=value1 ]", () => {
            const expected: string = `
[
    // foo
    key1 = value1
]`.trim();
            const actual: string = expectFormat("[ // foo\n key1=value1 ]");
            compare(expected, actual);
        });

        it("[ // foo\\n // bar \\n key1=value1 ]", () => {
            const expected: string = `
[
    // foo
    // bar
    key1 = value1
]`.trim();
            const actual: string = expectFormat("[ // foo\n // bar\n key1=value1 ]");
            compare(expected, actual);
        });

        it("[ /* foo */ // bar\\n key1=value1 ]", () => {
            const expected: string = `
[
    /* foo */
    // bar
    key1 = value1
]`.trim();
            const actual: string = expectFormat("[ /* foo */ // bar\n key1=value1 ]");
            compare(expected, actual);
        });

        it("[ /* foo */ // bar\\n /* foobar */ key1=value1 ]", () => {
            const expected: string = `
[
    /* foo */
    // bar
    /* foobar */ key1 = value1
]`.trim();
            const actual: string = expectFormat("[ /* foo */ // bar\n /* foobar */ key1=value1 ]");
            compare(expected, actual);
        });

        it("[ key1 = // foo\\n value1 ]", () => {
            const expected: string = `
[
    key1 =
        // foo
        value1
]`.trim();
            const actual: string = expectFormat("[ key1 = // foo\n value1 ]");
            compare(expected, actual);
        });

        it("[ key1 // foo\\n = value1 ]", () => {
            const expected: string = `
[
    key1
    // foo
    = value1
]`.trim();
            const actual: string = expectFormat("[ key1 // foo\n = value1 ]");
            compare(expected, actual);
        });

        it("section foobar; x = 1; // lineComment\n y = 1;", () => {
            const expected: string = `
section foobar;

x = 1;

// lineComment
y = 1;`.trim();
            const actual: string = expectFormat("section foobar; x = 1; // lineComment\n y = 1;");
            compare(expected, actual);
        });
    });
});
