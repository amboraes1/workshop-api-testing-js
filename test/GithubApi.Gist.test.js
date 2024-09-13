const axios = require("axios");
const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-subset"));
require("dotenv").config();

describe("replace", async () => {
  let gist;
  const baseURL = "https://api.github.com";
  const codeSent = `function promise() {
   return  new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});
 }`;
  const gistBody = {
    description: "Promise example",
    public: true,
    files: {
      "promiseEx.js": {
        content: codeSent,
      },
    },
  };
  let gistUrl;
  it("Create gist test", async () => {
    const request = {
      method: "POST",
      url: "/gists",
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
      data: gistBody,
    };
    try {
      gist = await axios(request);
      gistUrl = gist.data.url;
      expect(gist.status).to.eql(201);
      expect(gist.data.description).to.eql("Promise example");
      expect(gist.data.public).to.be.eql(true);
      expect(gist.data).to.containSubset(gistBody);
    } catch (e) {
      console.log(e);
    }
  });

  it("Gist exists", async () => {
    try {
      const gistExists = await axios.get(gistUrl);
      expect(gistExists.data).to.not.be.empty;
    } catch (e) {
      console.log(e);
    }
  });

  it("Delete gist", async () => {
    const request = {
      method: "DELETE",
      baseURL: gistUrl,
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    };
    try {
      const deletedGist = await axios(request);
      // console.log(gistUrl);
      expect(deletedGist.status).to.equal(204);
    } catch (e) {
      console.log(e);
    }
  });

  it("Gist should not exist", async () => {
    try {
      const gistIsDeleted = await axios.get(gistUrl);
    } catch (e) {
      expect(gistIsDeleted.status).to.equal(404);
    }
  });
});
