import chai from "chai";
import e from "express";
import request from "supertest";
import User from "../../../models/User";

const expect = chai.expect;

describe("/api/auth", () => {
  let server;

  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await User.deleteMany({});
    server.close();
  });

  describe("POST /", () => {
    it("should return 400, if some of the parameters are not passed/valid", async () => {
      const res = await request(server).post("/api/auth").send({
        email: "test@example.com",
        //   password: "password"
      });

      expect(res.status).to.be.eql(400);
    });

    it("should return 401, if invalid credentials are passed", async () => {
      const user = new User({
        name: "John Doe",
        email: "john.doe@gmail.com",
        password: "password@123",
      });

      user.save();

      const res = await request(server).post("/api/auth").send({
        email: "john.doe@gmail.com",
        password: "wrong password",
      });

      expect(res.status).to.be.eql(401);
    });

    it("should 201. if successful login", async () => {
      const user = {
        name: "john doe",
        email: "john.doe@gmail.com",
        password: "password",
      };

      await request(server).post("/api/users").send(user);

      const res = await request(server).post("/api/auth").send({
        email: "john.doe@gmail.com",
        password: "password",
      });

      expect(res.status).to.be.eql(201);
    });
  });
});
