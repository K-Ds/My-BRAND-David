import chai from "chai";
import request from "supertest";
import mongoose from "mongoose";
import path from "path";

import Post from "../../../models/Post";
import User from "../../../models/User";

const expect = chai.expect;

describe("/api/posts", () => {
  let server;

  const postUnit = (title) => {
    return {
      title: title,
      author: "Admin",
      image:
        "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
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

    it("should return 200 and get one post if id valid", async () => {
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

      const res = await request(server)
        .post("/api/posts")
        .set("x-auth-token", token)
        .field("Content-Type", "multipart/form-data")
        .field("title", "Test Article")
        .field("author", "tester");

      expect(res.status).to.be.eql(400);
    });

    it("should save the post and return 201, if creating new post is successful", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const token = userLocal.generateToken();

      const res = await request(server)
        .post("/api/posts")
        .set("x-auth-token", token)
        .field("Content-Type", "multipart/form-data")
        .field("title", "Test Article")
        .field("author", "tester")
        .field("body", "lorem ipsum test body")
        .attach("image", path.resolve(__dirname, "images/sample.jpg"));

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

      const input = {
        title: "test title",
        author: "Admin",
        image:
          "https://res.cloudinary.com/k-ds/image/upload/v1649666870/sample.jpg",
        body: "Lorem ipsum dolor sit amet",
      };

      const post = await new Post(input).save();

      const res = await request(server)
        .put("/api/posts/" + post._id)
        .set("x-auth-token", token)
        .field("Content-Type", "multipart/form-data")
        .field("Content-Type", "multipart/form-data")
        .field("title", "Test Article")
        .field("author", "tester");

      expect(res.status).to.be.eql(400);
    });

    it("should return 404, if blog is not found", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const postId = mongoose.Types.ObjectId();

      const res = await request(server)
        .put("/api/posts/" + postId)
        .set("x-auth-token", token)
        .field("Content-Type", "multipart/form-data")
        .field("Content-Type", "multipart/form-data")
        .field("title", "Test Article")
        .field("author", "tester")
        .field("body", "lorem ipsum test body")
        .attach("image", path.resolve(__dirname, "images/sample.jpg"));

      expect(res.status).to.be.eql(404);
    });

    it("should save the post and return 201, if creating updating blog is successful", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const token = userLocal.generateToken();

      const input = {
        title: "test title",
        author: "Admin",
        image:
          "https://res.cloudinary.com/k-ds/image/upload/v1649666870/sample.jpg",
        body: "Lorem ipsum dolor sit amet",
      };

      const post = await new Post(input).save();

      // Change title of post

      const res = await request(server)
        .put("/api/posts/" + post._id)
        .set("x-auth-token", token)
        .field("Content-Type", "multipart/form-data")
        .field("title", "test article updated")
        .field("author", "tester")
        .field("body", "lorem ipsum test body")
        .attach("image", path.resolve(__dirname, "images/sample.jpg"));

      const postNew = Post.findOne({ title: "test title updated" });

      expect(res.status).to.be.eql(201);
      expect(postNew).not.to.be.null;
      expect(res.body).to.have.property("title", "test title");
    });
  });

  // Delete a post
  describe("DELETE /:id", () => {
    it("should return 401, if no loged in", async () => {
      const res = await request(server).delete("/api/posts/" + 1);

      expect(res.status).to.be.eql(401);
    });

    it("should return 403, if not admin", async () => {
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

  // Comment post
  describe("POST /:id/comment", () => {
    it("should return 401, if no loged in", async () => {
      const res = await request(server).post("/api/posts/1/comment");

      expect(res.status).to.be.eql(401);
    });

    it("should return 400, if invalid Id is passed", async () => {
      const userLocal = createUser(true);
      await userLocal.save();
      const token = userLocal.generateToken();

      const res = await request(server)
        .post("/api/posts/1/comment")
        .set("x-auth-token", token);

      expect(res.status).to.be.eql(400);
    });

    it("should return 400, if the user does not provide all the requried parameters", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const token = userLocal.generateToken();
      const postId = mongoose.Types.ObjectId();

      const res = await request(server)
        .post(`/api/posts/${postId}/comment`)
        .set("x-auth-token", token)
        .send({ user: "tester" });

      expect(res.status).to.be.eql(400);
    });

    it("should return 404, if blog is not found", async () => {
      const userLocal = createUser(true);
      await userLocal.save();

      const token = userLocal.generateToken();

      const postId = mongoose.Types.ObjectId();

      const res = await request(server)
        .post(`/api/posts/${postId}/comment`)
        .set("x-auth-token", token)
        .send({
          user: "tester",
          content: "comment test",
        });

      expect(res.status).to.be.eql(404);
    });

    it("should save the comment and return 204", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const token = userLocal.generateToken();

      const input = {
        title: "test title",
        author: "Admin",
        image:
          "https://res.cloudinary.com/k-ds/image/upload/v1649666870/sample.jpg",
        body: "Lorem ipsum dolor sit amet",
      };

      const post = await new Post(input);
      post.save();

      // Change title of post

      const res = await request(server)
        .post(`/api/posts/${post._id}/comment`)
        .set("x-auth-token", token)
        .send({
          user: "tester",
          content: "comment test",
        });

      const postNew = await Post.findById(post._id);
      expect(res.status).to.be.eql(204);
      expect(postNew.comments[0]).to.have.property("content", "comment test");
    });
  });

  // Like post
  describe("POST /:id/like", () => {
    it("should return 401, if blog is not found", async () => {
      const userLocal = createUser(true);
      await userLocal.save();

      const token = userLocal.generateToken();

      const postId = mongoose.Types.ObjectId();

      const res = await request(server)
        .post(`/api/posts/${postId}/comment`)
        .send();

      expect(res.status).to.be.eql(401);
    });

    it("should like the post and return 201", async () => {
      const userLocal = createUser(true);

      await userLocal.save();

      const input = {
        title: "test title",
        author: "Admin",
        image:
          "https://res.cloudinary.com/k-ds/image/upload/v1649666870/sample.jpg",
        body: "Lorem ipsum dolor sit amet",
      };

      const post = await new Post(input).save();

      // Change title of post

      const res = await request(server)
        .post(`/api/posts/${post._id}/like`)
        .send();

      const postNew = await Post.findById(post._id);

      expect(res.status).to.be.eql(201);
      expect(postNew.likes).to.be.eql(1);
    });
  });
});
