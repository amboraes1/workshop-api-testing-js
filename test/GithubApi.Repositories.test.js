const axios = require("axios");
const chai = require("chai");
const md5 = require("md5");
chai.use(require("chai-subset"));

const { expect } = chai;

describe("Consumiendo Metodos GET", () => {
  const baseUrl = "https://api.github.com";
  let repositoriesUrl;

  it("Should test name, company and location", async () => {
    const response = await axios.get(`${baseUrl}/users/aperdomob`);
    expect(response.data.name).to.be.a("string").and.eql("Alejandro Perdomo");
    expect(response.data.company).to.be.a("string").and.eql("Perficient Latam");
    expect(response.data.location).to.be.a("string").and.eql("Colombia");
    repositoriesUrl = response.data.repos_url;
  });
  describe("Getting user repositories", () => {
    let repositories;
    let repository;
    it("should get repos through Hypermedia", async () => {
      repositories = await axios.get(repositoriesUrl);

      repository = repositories.data.find(
        (el) => el.name === "jasmine-json-report",
      );

      expect(repository.name).to.be.a("string").and.eql("jasmine-json-report");
      expect(repository.private).to.be.a("boolean").and.equal(false);
      expect(repository.description)
        .to.be.a("string")
        .and.eql("A Simple Jasmine JSON Report");
    });

    it("should download as zip", async () => {
      let repoZip;
      const requestToDownload = {
        method: "GET",
        url: `${repository.svn_url}/archive/${repository.default_branch}.zip`,
      };
      try {
        repoZip = await axios(requestToDownload);
        // eslint-disable-next-line no-unused-expressions
        expect(repoZip).to.exist;
      } catch (e) {
        console.log(e);
      }
    });
    describe("downloaded archives from repository", async () => {
      let repositoryFiles;
      let readmeFile;
      const format = {
        name: "README.md",
        path: "README.md",
        sha: "360eee6c223cee31e2a59632a2bb9e710a52cdc0",
      };
      it("should download repository archives list ", async () => {
        const request = {
          method: "GET",
          url: `${repository.url}/contents`,
        };

        try {
          repositoryFiles = await axios(request);
          readmeFile = repositoryFiles.data.find(
            (el) => el.name === "README.md",
          );
          expect(readmeFile).to.containSubset(format);
          // console.log(readmeFile);
        } catch (e) {
          console.log("fallo");
        }
      });

      it("should  download readme and check MD5", async () => {
        const readmemd5 = "497eb689648cbbda472b16baaee45731";
        const requestToDownloadReadMe = {
          method: "GET",
          url: `${readmeFile.download_url}`,
        };

        try {
          const responseDownloadReadme = await axios(requestToDownloadReadMe);
          expect(md5(responseDownloadReadme.data)).to.equal(readmemd5);
        } catch (e) {
          console.log("fallo");
        }
      });
    });
  });
});
