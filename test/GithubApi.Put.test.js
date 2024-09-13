const axios = require("axios");
const { expect } = require("chai");
require("dotenv").config();

describe("Consumiento petodos PUT", () => {
  const baseURL = "https://api.github.com";
  const usuario = "aperdomob";
  it("Seguir al usuario por medio de PUT", async () => {
    const request = {
      method: "PUT",
      url: `/user/following/${usuario}`,
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    };
    try {
      const putResponse = await axios(request);
      expect(putResponse.status).to.equal(204);
      // eslint-disable-next-line no-unused-expressions
      expect(putResponse.data).to.be.empty;
    } catch (e) {
      console.log(e);
    }
  });

  it(`Verificat que seguimos al usuario ${usuario}`, async () => {
    const request = {
      method: "GET",
      url: "/user/following",
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    };

    try {
      const responseFollowing = await axios(request);
      const followeUser = responseFollowing.data.find(
        (el) => el.login === usuario,
      );
      expect(followeUser).to.not.be.empty;
    } catch (e) {
      console.log(e);
    }
  });
  it("idempotencia del metodo", async () => {
    const request = {
      method: "PUT",
      url: `/user/following/${usuario}`,
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    };

    let putResponse;

    try {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 10; i++) {
        // eslint-disable-next-line no-await-in-loop
        putResponse = await axios(request);
      }
      expect(putResponse.status).to.equal(204);
      // eslint-disable-next-line no-unused-expressions
      expect(putResponse.data).to.be.empty;
    } catch (e) {
      console.log(e);
    }
  });
});
