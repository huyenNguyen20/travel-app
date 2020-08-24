import "babel-polyfill"
const request = require("supertest")
const app = require("../src/server/app")

const projectData = [{
    test: "test"
}]
test("Testing POST route", async () => {
    await request(app)
    .post("/search")   
    .send({
        city: 'hanoi',
        today: '2020-08-24',
        tripDate: '2020-08-30',
        daysLeft: 6
    })
    .expect(400)
})      

test("Testing GET route", async () => {
    await request(app)
    .get("/all")   
    .send()
    .expect(404)
}) 