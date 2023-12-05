/**
 * Test of the function md2adr.
 */

global.localStorage = {
    getItem() {
        return "abc....";
    }
};
import { searchRepositoryList } from "../src/plugins/api.js";
import { searchTermRepoPairs, mockedValues } from "./constants.js";
import axios from "axios";

jest.mock("axios");

for (let i = 0; i < searchTermRepoPairs.length; i++) {
    let searchTerm = searchTermRepoPairs[i].searchTerm;
    let expectedResult = searchTermRepoPairs[i].results;
    axios.get.mockImplementation(() => Promise.resolve(mockedValues));

    test("Test Searching Repos with list in parameter. Searching for " + searchTerm, async () => {
        let list = [];
        // Test the function
        await searchRepositoryList(searchTerm, 2, list);
        expect(list).toStrictEqual(expectedResult);
    });
    test("Test Searching Repos without passing list. Searching for " + searchTerm, async () => {
        let list = [];
        await searchRepositoryList(searchTerm, 3).then((res) => {
            list = res;
        });
        expect(list).toStrictEqual(expectedResult.slice(0, 30));
    });
}
