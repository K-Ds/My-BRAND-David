import chai from "chai";
import request from "supertest";
import Post from "../../../models/Post";
import User from "../../../models/User";

const expect = chai.expect;

describe("/api/posts", () => {
  let server;
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await Post.deleteMany({});
    server.close();
  });

  describe("GET /", () => {
    it("should get all posts", async () => {
      await Post.collection.insertMany([
        {
          title: "Post 1",
          author: "Admin",
          img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
          body: "Lorem ipsum dolor sit amet",
        },
        {
          title: "Post 2",
          author: "Admin",
          img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
          body: "Lorem ipsum dolor sit amet",
        },
      ]);
      const res = await request(server).get("/api/posts");

      expect(res.status).to.be.eq(200);
      expect(res.body).to.have.lengthOf(2);
      expect(res.body.some((p) => p.title === "Post 1")).to.be.true;
      expect(res.body.some((p) => p.title === "Post 2")).to.be.true;
    });
  });

  describe("GET /:id", () => {
    it("should get one post if id valid", async () => {
      const post = new Post({
        title: "Post 1",
        author: "Admin",
        img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
        body: "Lorem ipsum dolor sit amet",
      });

      await post.save();

      const res = await request(server).get("/api/posts/" + post._id);

      expect(res.status).to.be.eql(200);
      expect(res.body).to.have.property("title", post.title);
    });

    it("should return 404 if id is invalid", async () => {
      const res = await request(server).get("/api/posts/" + 1);

      expect(res.status).to.be.eql(404);
    });
  });

  describe("POST /", () => {
    it("should return 401, if no token provided (Client not logged in)", async () => {
      const res = await request(server).post("/api/posts");

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, If the user is not an admin", async () => {
      const userLocal = new User({
        name: "nonadmin",
        email: "nonadmin@gmail.com",
        password: "password",
      });

      userLocal.save();

      const token = userLocal.generateToken();

      const res = await request(server)
        .post("/api/posts")
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(403);
    });

    it("should return 400, if the user does not provide all the requried parameters", async () => {
      const userLocal = new User({
        name: "nonadmin",
        email: "nonadmin@gmail.com",
        password: "password",
        isAdmin: true,
      });

      userLocal.save();

      const token = userLocal.generateToken();

      const input = {
        title: "Tommorow x",
        author: "Admin",
        img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
        // body: "Lorem ipsum dolor sit amet",
      };

      const res = await request(server)
        .post("/api/posts")
        .send(input)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(400);
    });

    it("should save the post and return 201, if creating new post is successful", async () => {
      const userLocal = new User({
        name: "nonadmin",
        email: "nonadmin@gmail.com",
        password: "password",
        isAdmin: true,
      });

      userLocal.save();

      const token = userLocal.generateToken();

      const input = {
        title: "Tommorow x",
        author: "Admin",
        img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
        body: "Lorem ipsum dolor sit amet",
      };

      const res = await request(server)
        .post("/api/posts")
        .send(input)
        .set("x-auth-token", token);

      const post = Post.findOne({ title: "Tommorow x" });

      expect(res.status).to.be.eql(201);
      expect(res.body).to.have.property("title");
      expect(post).not.to.be.null;
    });
  });

  describe("PUT /:id", () => {
    it("should return 401, if no token provided (Client not logged in)", async () => {
      const res = await request(server).post("/api/posts");

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, If the user is not an admin", async () => {
      const userLocal = new User({
        name: "nonadmin",
        email: "nonadmin@gmail.com",
        password: "password",
      });

      userLocal.save();

      const token = userLocal.generateToken();

      const res = await request(server)
        .post("/api/posts")
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(403);
    });

    it("should return 400, if the user does not provide all the requried parameters", async () => {
      const userLocal = new User({
        name: "nonadmin",
        email: "nonadmin@gmail.com",
        password: "password",
        isAdmin: true,
      });

      userLocal.save();

      const token = userLocal.generateToken();

      const input = {
        title: "Tommorow x",
        author: "Admin",
        img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
        // body: "Lorem ipsum dolor sit amet",
      };

      const res = await request(server)
        .post("/api/posts")
        .send(input)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(400);
    });

    it("should save the post and return 201, if creating new post is successful", async () => {
      const userLocal = new User({
        name: "nonadmin",
        email: "nonadmin@gmail.com",
        password: "password",
        isAdmin: true,
      });

      userLocal.save();

      const token = userLocal.generateToken();

      const input = {
        title: "Tommorow x",
        author: "Admin",
        img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
        body: "Lorem ipsum dolor sit amet",
      };

      const res = await request(server)
        .post("/api/posts")
        .send(input)
        .set("x-auth-token", token);

      const post = Post.findOne({ title: "Tommorow x" });

      expect(res.status).to.be.eql(201);
      expect(res.body).to.have.property("title");
      expect(post).not.to.be.null;
    });
  });
});
