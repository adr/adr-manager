/**
 * Test of the fucntion md2adr.
 */

global.localStorage = {
    getItem() {
        return 'abc....';
    }
}
import { searchRepositoryList } from "../api.js";

import { searchTermRepoPairs } from "./constants.js";

for (let i = 0; i < searchTermRepoPairs.length; i++) {
    let searchTerm = searchTermRepoPairs[i].searchTerm;
    let expectedResult = searchTermRepoPairs[i].result;

    test("Test Searching Repos with list in parameter. Searching for " + searchTerm,
        async () => {
            let list = [];
            await searchRepositoryList(searchTerm, 20, list);
            expect(list).toStrictEqual(expectedResult.slice(0, 20));
        }
    )
    test("Test Searching Repos without passing list. Searching for " + searchTerm,
        async () => {
            let list = [];
            await searchRepositoryList(searchTerm, 30)
                .then((res) => { list = res; });
            expect(list).toStrictEqual(expectedResult.slice(0, 30));
        }
    )
}