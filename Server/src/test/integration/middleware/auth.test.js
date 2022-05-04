import request from "supertest";
import Post from "../../../models/Post";
import User from "../../../models/User";

import chai from "chai";
const expect = chai.expect;

// describe("auth middleware", () => {
//   let server;
//   beforeEach(() => {
//     server = require("../../../index");
//   });

//   afterEach(async () => {
//     await Post.remove({});
//     server.close();
//   });

//   let token;
//   const exec = () => {
//     return request(server)
//       .post("/api/posts")
//       .send({
//         title: "Post 1",
//         author: "Admin",
//         image:
//           "C:\\Users\\karda\\OneDrive\\Desktop\\ATLP\\My-BRAND-David\\UI\\images\\computer.jpeg",
//         body: "Lorem ipsum dolor sit amet",
//       })
//       .set("x-auth-token", token);
//   };

//   it("should return 401, if invalid ID is passed", async () => {
//     token = "";
//     const res = await exec();

//     expect(res.status).to.be.eql(401);
//   });

//   it("should return 400, If an invalid token is provided", async () => {
//     token = "a";
//     const res = await exec();
//     expect(res.status).to.be.eql(400);
//   });

//   it("should return 202, if TOken is valid", async () => {
//     const user = new User({
//       name: "nonadmin",
//       email: "nonadmin@gmail.com",
//       password: "password",
//       isAdmin: true,
//     });

//     token = user.generateToken();
//     const res = await exec();

//     expect(res.status).to.be.eql(201);
//   });
// });
