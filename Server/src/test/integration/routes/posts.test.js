import chai from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Post from "../../../models/Post";
import User from "../../../models/User";

const expect = chai.expect;

describe("/api/posts", () => {
  let server;

  const postUnit = (title) => {
    return {
      title: title,
      author: "Admin",
      img: "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
      body: "Lorem ipsum dolor sit amet",
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
    await Post.deleteMany({});
    await User.deleteMany({});
    server.close();
  });

  // Get all posts
  describe("GET /", () => {
    it("should get all posts", async () => {
      await Post.collection.insertMany([
        postUnit("Post 1"),
        postUnit("Post 2"),
      ]);
      const res = await request(server).get("/api/posts");

      expect(res.status).to.be.eq(200);
      expect(res.body).to.have.lengthOf(2);
      expect(res.body.some((p) => p.title === "Post 1")).to.be.true;
      expect(res.body.some((p) => p.title === "Post 2")).to.be.true;
    });
  });

  // Get one post by ID
  describe("GET /:id", () => {
    it("should return 400 if id is invalid", async () => {
      const res = await request(server).get("/api/posts/" + 1);

      expect(res.status).to.be.eql(400);
    });

    it("Should return 404, If blog is not found", async () => {
      const postId = mongoose.Types.ObjectId();

      const res = await request(server).get("/api/posts" + postId);

      expect(res.status).to.be.eql(404);
    });

    it("should get one post if id valid", async () => {
      const post = new Post(postUnit("Posst 1"));

      await post.save();

      const res = await request(server).get("/api/posts/" + post._id);

      expect(res.status).to.be.eql(200);
      expect(res.body).to.have.property("title", post.title);
    });
  });

  // Post new post
  describe("POST /", () => {
    it("should return 401, if no token provided (Client not logged in)", async () => {
      const res = await request(server).post("/api/posts");

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, If the user is not an admin", async () => {
      const userLocal = createUser(false);

      await userLocal.save();

      const token = userLocal.generateToken();

      const res = await request(server)
        .post("/api/posts")
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(403);
    });

    it("should return 400, if the user does not provide all the requried parameters", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const post = postUnit("Post 1");
      delete post.author;

      const res = await request(server)
        .post("/api/posts")
        .send(post)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(400);
    });

    it("should save the post and return 201, if creating new post is successful", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const token = userLocal.generateToken();

      const res = await request(server)
        .post("/api/posts")
        .send(postUnit("Post 1"))
        .set("x-auth-token", token);

      const post = Post.findOne({ title: "Post 1" });

      expect(res.status).to.be.eql(201);
      expect(res.body).to.have.property("title");
      expect(post).not.to.be.null;
    });
  });

  // Update a post
  describe("PUT /:id", () => {
    it("should return 401, if no token provided (Client not logged in)", async () => {
      const res = await request(server).put("/api/posts/" + 1);

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, If the user is not an admin", async () => {
      const userLocal = createUser(false);

      await userLocal.save();

      const token = userLocal.generateToken();

      const res = await request(server)
        .put("/api/posts/" + 1)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(403);
    });

    it("should return 400, if the user does not provide all the requried parameters", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const token = userLocal.generateToken();

      const input = postUnit("Post x");
      const post = await new Post(input).save();

      delete input.author;

      const res = await request(server)
        .put("/api/posts/" + post._id)
        .send(input)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(400);
    });

    it("should return 404, if blog is not found", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const postId = mongoose.Types.ObjectId();

      const res = await request(server)
        .put("/api/posts/" + postId)
        .send(postUnit("Post 1"))
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(404);
    });

    it("should save the post and return 201, if creating updating blog is successful", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const token = userLocal.generateToken();

      const input = postUnit("Post x");

      const post = await new Post(input).save();

      // Change title of post
      input.title = "Post y";

      const res = await request(server)
        .put("/api/posts/" + post._id)
        .send(input)
        .set("x-auth-token", token);

      const postNew = Post.findOne({ title: "Post y" });

      expect(res.status).to.be.eql(201);
      expect(res.body).to.have.property("title", "Post x");
      expect(postNew).not.to.be.null;
    });
  });

  // Delete a post
  describe("DELETE /:id", () => {
    it("should return 401, if no loged in", async () => {
      const res = await request(server).delete("/api/posts/" + 1);

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, if not logged in", async () => {
      const userLocal = createUser(false);
      await userLocal.save();
      const token = userLocal.generateToken();

      const res = await request(server)
        .delete("/api/posts/" + 1)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(403);
    });

    it("should return 400, if invalid Id is passed", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const res = await request(server)
        .delete("/api/posts/" + 1)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(400);
    });

    it("should return 404, if blog is not found", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const postId = mongoose.Types.ObjectId();

      const res = await request(server)
        .delete("/api/posts/" + postId)
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(404);
    });

    it("should return 204, if post successfully deleted", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const post = await new Post(postUnit("Post 1")).save();

      const res = await request(server)
        .delete("/api/posts/" + post._id)
        .set("x-auth-token", token);

      const deletedPost = await Post.findOne({ _id: post._id });

      expect(res.status).to.be.eql(204);
      expect(deletedPost).to.be.null;
    });

    it("should retrun 404, if blog not found", async () => {});
  });
});
