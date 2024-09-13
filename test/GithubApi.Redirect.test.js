const axios = require("axios");
const { expect } = require("chai");

describe("replace", () => {
  const baseUrl = "https://github.com/";
  const expectedUrl = "https://github.com/aperdomob/new-redirect-test";
  it("redirect on head request", async () => {
    try {
      const headResponse = await axios.head(
        `${baseUrl}/aperdomob/redirect-test`,
      );
      expect(headResponse.status).to.eql(200);
      expect(headResponse.request.res.responseUrl).to.eq(expectedUrl);
    } catch (e) {
      console.log(e);
    }
  });

  it("correct redirection on GET", async () => {
    try {
      const getResponse = await axios.get(`${baseUrl}/aperdomob/redirect-test`);
      expect(getResponse.status).to.eql(200);
      expect(getResponse.request.res.responseUrl).to.eq(expectedUrl);
    } catch (e) {
      console.log(e);
    }
  });
});
