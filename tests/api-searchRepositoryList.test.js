/**
 * Test of the function md2adr.
 */

global.localStorage = {
    getItem() {
        return "abc....";
    }
};
console.log("###### print local storage #######", localStorage.getItem("authId"))
import { searchRepositoryList } from "../src/plugins/api.js";

import { searchTermRepoPairs } from "./constants.js";
import axios from 'axios';

jest.mock('axios');



for (let i = 0; i < searchTermRepoPairs.length; i++) {
    let searchTerm = searchTermRepoPairs[i].searchTerm;
    let expectedResult = searchTermRepoPairs[i].results;

    test("Test Searching Repos with list in parameter. Searching for " + searchTerm, async () => {
        console.log(localStorage.getItem("authId"))
        let list = [];
        axios.post.mockResolvedValue({

            data:
            {
                "data": {
                    "user": {
                        "repositories": {
                            "nodes": [
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnk3NzczNjc5MQ==",
                                    "resourcePath": "/Moneexa/Moneexa-s",
                                    "updatedAt": "2016-12-31T11:09:31Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnk4Mjc3NDI4NQ==",
                                    "resourcePath": "/Moneexa/LAB2",
                                    "updatedAt": "2017-02-22T07:30:23Z",
                                    "description": null,
                                    "defaultBranchRef": null
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyMjI4Njk3MDE=",
                                    "resourcePath": "/Moneexa/WebCrawler",
                                    "updatedAt": "2019-11-20T07:22:25Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyMzY4MTI1MTA=",
                                    "resourcePath": "/mohsini172/mobo-gamez",
                                    "updatedAt": "2020-02-19T17:03:45Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyNTA2MTc4ODg=",
                                    "resourcePath": "/Moneexa/BMICalculator",
                                    "updatedAt": "2020-03-30T12:59:52Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyNTIxODg3NDc=",
                                    "resourcePath": "/Moneexa/mobo-games",
                                    "updatedAt": "2020-04-01T14:20:01Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyNTIxODU0NzA=",
                                    "resourcePath": "/Moneexa/HangMan",
                                    "updatedAt": "2020-04-05T05:11:11Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyNTMyNDQ0MDU=",
                                    "resourcePath": "/Moneexa/Zeldog",
                                    "updatedAt": "2020-04-05T13:43:08Z",
                                    "description": "A Zelda game with dog, ducks, etc",
                                    "defaultBranchRef": {
                                        "name": "gh-pages"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyNTM0NDYyNzg=",
                                    "resourcePath": "/Moneexa/Commitee",
                                    "updatedAt": "2020-04-30T18:12:52Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyNzQ5MTI1MTQ=",
                                    "resourcePath": "/Moneexa/currencyConverter",
                                    "updatedAt": "2020-06-28T19:18:00Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyODE0MDYzMTQ=",
                                    "resourcePath": "/Moneexa/Analysis-of-company",
                                    "updatedAt": "2020-07-21T13:38:03Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyODE0MjIzNDA=",
                                    "resourcePath": "/Moneexa/Optical-character-recognition",
                                    "updatedAt": "2020-07-21T14:39:22Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzMDE2OTQ4MTI=",
                                    "resourcePath": "/Moneexa/messenger-app",
                                    "updatedAt": "2020-11-08T08:58:11Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkyNjU4ODc5MDI=",
                                    "resourcePath": "/Moneexa/Pipool",
                                    "updatedAt": "2020-11-14T14:26:15Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzMTE4NjE5Nzk=",
                                    "resourcePath": "/Moneexa/pak-wheels",
                                    "updatedAt": "2020-11-28T09:37:18Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzMjg5NDc4ODc=",
                                    "resourcePath": "/mohsini172/fpl",
                                    "updatedAt": "2021-01-13T13:13:59Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzMjEwMzY4NTA=",
                                    "resourcePath": "/Moneexa/FantasyPremierLeague",
                                    "updatedAt": "2021-02-22T15:24:45Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzNTkyMDIzNzU=",
                                    "resourcePath": "/Moneexa/ChatApplication",
                                    "updatedAt": "2021-05-17T11:25:46Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzNTcyMjQzNzQ=",
                                    "resourcePath": "/Moneexa/Sagas",
                                    "updatedAt": "2021-05-20T07:55:51Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzNjQ2NTg4NDM=",
                                    "resourcePath": "/Moneexa/design-challenge",
                                    "updatedAt": "2021-06-26T13:22:35Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzODUyOTE3MzY=",
                                    "resourcePath": "/taimoortahir7/bitz-leads-development-react",
                                    "updatedAt": "2021-07-12T15:32:27Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzODUyODU5MDQ=",
                                    "resourcePath": "/taimoortahir7/bitz-leads-development-next",
                                    "updatedAt": "2021-07-12T15:33:44Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "R_kgDOGVzEbg",
                                    "resourcePath": "/Moneexa/Moneexa",
                                    "updatedAt": "2021-11-07T13:25:08Z",
                                    "description": "Config files for my GitHub profile.",
                                    "defaultBranchRef": null
                                },
                                {
                                    "id": "R_kgDOIvFosg",
                                    "resourcePath": "/mohsini172/Energy",
                                    "updatedAt": "2023-01-07T13:15:11Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "R_kgDOJaSbOg",
                                    "resourcePath": "/Moneexa/SuSAFHackathon",
                                    "updatedAt": "2023-04-23T14:26:47Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "R_kgDOJcpDdw",
                                    "resourcePath": "/Moneexa/SusAFAnalysis",
                                    "updatedAt": "2023-04-28T20:14:45Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "R_kgDOJmhUzw",
                                    "resourcePath": "/Moneexa/arcore_flutter_plugin",
                                    "updatedAt": "2023-05-23T11:33:23Z",
                                    "description": "Flutter plugin for ARCore SDK, Android platform to build new augmented reality experiences",
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "R_kgDOJpztCQ",
                                    "resourcePath": "/tasbihaasim/foodapp",
                                    "updatedAt": "2023-05-31T15:26:12Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "R_kgDOKTErCg",
                                    "resourcePath": "/Moneexa/powely-evaluation",
                                    "updatedAt": "2023-09-13T19:19:29Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "R_kgDOKY-ayw",
                                    "resourcePath": "/Moneexa/metahaven-ukraine",
                                    "updatedAt": "2023-09-27T12:03:15Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "R_kgDOI2sWlQ",
                                    "resourcePath": "/Moneexa/VolcanicErruption",
                                    "updatedAt": "2023-10-18T21:42:57Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "R_kgDOKiLYvA",
                                    "resourcePath": "/Moneexa/MyArdoqTask",
                                    "updatedAt": "2023-10-18T22:43:31Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "R_kgDOKrHqDg",
                                    "resourcePath": "/Moneexa/CrowdNav",
                                    "updatedAt": "2023-11-09T11:32:01Z",
                                    "description": "A model problem for big data self adaptive systems using SUMO and TraCI",
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "R_kgDOKsK6Ww",
                                    "resourcePath": "/tasbihaasim/UPISAS",
                                    "updatedAt": "2023-11-11T11:50:40Z",
                                    "description": "unofficial fork of the UPISAS repository",
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                },
                                {
                                    "id": "R_kgDOKsK_Sw",
                                    "resourcePath": "/tasbihaasim/crowdnave",
                                    "updatedAt": "2023-11-11T14:45:09Z",
                                    "description": null,
                                    "defaultBranchRef": {
                                        "name": "master"
                                    }
                                },
                                {
                                    "id": "MDEwOlJlcG9zaXRvcnkzMDQwMTM4MjY=",
                                    "resourcePath": "/adr/adr-manager",
                                    "updatedAt": "2023-11-13T13:30:58Z",
                                    "description": "ADR-Manager",
                                    "defaultBranchRef": {
                                        "name": "main"
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        });
        // Test the function
        await searchRepositoryList(searchTerm, 10, list);
        expect(list).toStrictEqual(expectedResult);
    });
    test("Test Searching Repos without passing list. Searching for " + searchTerm, async () => {
        let list = [];
        await searchRepositoryList(searchTerm, 30).then((res) => {
            list = res;
        });
        expect(list).toStrictEqual(expectedResult.slice(0, 30));
    });
}
