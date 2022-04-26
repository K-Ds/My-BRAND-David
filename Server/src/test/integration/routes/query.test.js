import chai from "chai";
import request from "supertest";
import Query from "../../../models/Query";
import mongoose from "mongoose";
import User from "../../../models/User";

const expect = chai.expect;

describe("api/queries", () => {
  let server;

  const queryUnit = (body) => {
    return {
      name: "admin",
      email: "john.doe@gmail.com",
      subject: "Generic",
      body: body,
    };
  };

  const createUser = (isAdmin) => {
    const userInput = {
      name: "john doe",
      email: "john.doe@gmail.com",
      password: "password@123",
      isAdmin: isAdmin,
    };
    const user = new User(userInput);
    return user;
  };

  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await Query.deleteMany({});
    await User.deleteMany({});
    server.close();
  });

  // Get all queries
  describe("GET /", () => {
    it("should return 401, if no token provided (Client not logged in)", async () => {
      const res = await request(server).get("/api/queries");

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, If the user is not an admin", async () => {
      const userLocal = createUser(false);
      await userLocal.save();
      const token = userLocal.generateToken();

      const res = await request(server)
        .get("/api/queries/" + 1)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(403);
    });

    it("should return 200, get all queries", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const res = await request(server)
        .get("/api/queries")
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(200);
    });
  });

  // Get one query by Id
  describe("GET /:id", () => {
    it("should return 401, if no token provided (Client not logged in)", async () => {
      const res = await request(server).get("/api/queries/" + 1);

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, If the user is not an admin", async () => {
      const userLocal = createUser(false);
      await userLocal.save();
      const token = userLocal.generateToken();

      const res = await request(server)
        .get("/api/queries/" + 1)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(403);
    });

    it("should return 400 if id is invalid", async () => {
      const userLocal = await createUser(true).save();
      const token = userLocal.generateToken();

      const res = await request(server)
        .get("/api/queries/" + 1)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(400);
    });

    it("Should return 404, If query is not found", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const queryId = mongoose.Types.ObjectId();

      const res = await request(server)
        .get("/api/queries/" + queryId)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(404);
    });

    it("should return 200 and get one query if id valid", async () => {
      const userlocal = await createUser(true).save();
      const token = userlocal.generateToken();

      const query = await new Query(queryUnit("query 1")).save();

      const res = await request(server)
        .get("/api/queries/" + query._id)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(200);
      expect(res.body).to.have.property("body", query.body);
    });
  });

  // POST new query
  describe("POST /", () => {
    it("should return 400, if the user does not provide all the requried parameters", async () => {
      const query = queryUnit("query 1");
      delete query.body;

      const res = await request(server).post("/api/queries").send(query);

      expect(res.status).to.be.eql(400);
    });

    it("should save the query and return 201, if creating new query is successful", async () => {
      const res = await request(server)
        .post("/api/queries")
        .send(queryUnit("query 1"));

      const query = Query.findOne({ body: "query 1" });

      expect(res.status).to.be.eql(201);
      expect(query).not.to.be.null;
    });
  });
});
