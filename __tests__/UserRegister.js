/* eslint-disable no-unused-vars */
const request = require("supertest");
const Server = require("../models/server");

const server = new Server();

const { dbConnection } = require("../database/config");

const User = require("../models/user");

let connectDB;

beforeAll(async () => {
    connectDB = await dbConnection();
});

beforeEach(() => {
    return User.db.dropCollection("users");
});

// afterAll(() => {
//     connectDB.disconnect();
// });

describe("User Registration", () => {
    it('Returns "201 OK" when signup request is valid', (done) => {
        request(server.app)
            .post("/auth/local/register")
            .send({
                email: "aldhairvera@gmail.com",
                password: "T3st1234*",
            })
            .expect(201, done);
    });

    it('Returns "User created" when signup request is valid', (done) => {
        request(server.app)
            .post("/auth/local/register")
            .send({
                email: "user1@test.com",
                password: "T3st1234*",
            })
            .then((response) => {
                expect(response.body.msg).toBe(
                    "Congrats, your user is successfully created!"
                );
                done();
            });
    });

    it("Saves the user to database", (done) => {
        request(server.app)
            .post("/auth/local/register")
            .send({
                email: "user1@test.com",
                password: "T3st1234*",
            })
            .then(() => {
                User.find().then((userList) => {
                    expect(userList.length).toBe(1);
                    done();
                });
            });
    });

    it("Saves the user's email to database", (done) => {
        request(server.app)
            .post("/auth/local/register")
            .send({
                email: "user1@test.com",
                password: "T3st1234*",
            })
            .then(() => {
                User.find().then((userList) => {
                    const { email } = userList[0];
                    expect(email).toBe("user1@test.com");
                    done();
                });
            });
    });
});
