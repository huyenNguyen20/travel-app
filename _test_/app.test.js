import "babel-polyfill"
import { postData, getProjectData } from "../src/client/js/app.js"

describe("Testing the application functionality", () => {
    test("Testing the postData() function", () => { 
           expect(postData).toBeDefined();
    })
    test("Testing the postData() function", () => { 
        expect(getProjectData).toBeDefined();
    })
});