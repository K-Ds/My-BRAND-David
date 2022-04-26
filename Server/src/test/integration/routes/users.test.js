import chai from "chai";
import request from "supertest";
import User from "../../../models/User";

const expect = chai.expect;

describe("/api/users", () => {
  let server;

  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await User.deleteMany({});
    server.close();
  });

  describe("POST /", () => {
    it("should return 400, if some of the parameters are not given/invalid", async () => {
      const userInput = {
        name: "john doe",
        email: "john.doe@gmail.com",
        // password: "password",
      };

      const res = await request(server).post("/api/users").send(userInput);

      expect(res.status).to.be.eql(400);
    });

    it("should return 400, if email already exists", async () => {
      const userInput = {
        name: "john doe",
        email: "john.doe@gmail.com",
        password: "password",
      };

      // First user of an email
      await request(server).post("/api/users").send(userInput);

      // second time of an email
      const res = await request(server).post("/api/users").send(userInput);

      expect(res.status).to.be.eql(400);
    });

    it("should return 201, if creating user is successful", async () => {
      const userInput = {
        name: "john doe",
        email: "john.doe@gmail.com",
        password: "password",
      };

      const res = await request(server).post("/api/users").send(userInput);

      expect(res.status).to.be.eql(201);
      expect(res.body).to.have.property("email", userInput.email);
    });
  });
});
