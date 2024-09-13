const axios = require("axios");
const { expect } = require("chai");

describe("Query parameters fr managing amount of results", () => {
  const baseURL = "https://api.github.com";
  it("get default amount of users", async () => {
    try {
      const getUsers = await axios.get(`${baseURL}/users`);
      expect(getUsers.data).to.have.length(30);
    } catch (e) {
      console.log("fallo");
    }
  });

  it("get 10 users", async () => {
    const request = {
      method: "GET",
      baseURL: `${baseURL}/users`,
      params: {
        per_page: 10,
      },
    };

    try {
      const getUsers = await axios(request);
      expect(getUsers.data).to.have.length(10);
    } catch (e) {
      console.log("fallo");
    }
  });

  it("get 100 users", async () => {
    const request = {
      method: "GET",
      baseURL: `${baseURL}/users`,
      params: {
        per_page: 100,
      },
    };

    try {
      const getUsers = await axios(request);
      expect(getUsers.data).to.have.length(100);
    } catch (e) {
      console.log("fallo");
    }
  });
});
