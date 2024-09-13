const axios = require("axios");
const { expect } = require("chai");
require("dotenv").config();

describe("Consuming POST and PATCH", () => {
  let user;
  let reposUrl;
  const baseURL = "https://api.github.com";
  it("Getting logged in user", async () => {
    const request = {
      method: "GET",
      url: "/user",
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    };

    try {
      const responseUser = await axios(request);
      user = responseUser.data.login;
      reposUrl = responseUser.data.repos_url;
      expect(user).to.not.be.empty;
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  });
  describe("getting repos and checking", () => {
    let repositories;
    let publicRepo;
    let issue;
    let issueNumber;
    const issueName = "Random name";
    it("check if there is a public repo", async () => {
      const request = {
        method: "GET",
        baseURL: `${reposUrl}`,
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`,
        },
      };

      try {
        repositories = await axios(request);
        publicRepo = repositories.data.find((el) => el.private === false);
        expect(publicRepo).to.not.be.empty;
      } catch (e) {
        console.log(e);
      }
    });

    it("create issue for repo", async () => {
      const request = {
        method: "POST",
        url: `/repos/${user}/${publicRepo.name}/issues`,
        baseURL: `${baseURL}`,
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`,
        },
        data: {
          title: issueName,
        },
      };

      try {
        issue = await axios(request);
        issueNumber = issue.data.number;
        expect(issue.data.title).to.eql(issueName);
        expect(issue.data.body).to.be.null;
        // console.log(issue.data);
      } catch (e) {
        console.log(e);
      }
    });

    it("Update the issue", async () => {
      let modifiedIssue;
      const request = {
        method: "PATCH",
        url: `/repos/${user}/${publicRepo.name}/issues/${issueNumber}`,
        baseURL: `${baseURL}`,
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`,
        },
        data: {
          body: "some body",
        },
      };

      modifiedIssue = await axios(request);
      expect(modifiedIssue.data.title).to.eql(issueName);
      expect(modifiedIssue.data.body).to.eql("some body");
      // console.log(modifiedIssue.data);
    });
  });
});
