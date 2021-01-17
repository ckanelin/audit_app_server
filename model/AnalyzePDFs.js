const DocumentAI = require("../api/DocumentAI.js");
const CloudStorage = require("../api/CloudStorage.js");
const Matcher = require("./Matcher.js");

class AnalyzePDFs {
  constructor() {
    this.documentAI = new DocumentAI();
    this.cloudStorage = new CloudStorage();
  }

  async analyze(sampleUploadMap, filters) {
    const resultsMap = new Map();
    for (let pair of sampleUploadMap) {
      await this.downloadProcessMatch(pair[1], resultsMap, pair[0], filters);
    }
    //console.log(resultsMap);
    return resultsMap;
  }

  async downloadProcessMatch(documentName, resultsMap, index, filters) {
    await this.cloudStorage.downloadFile(documentName);
    const match = await this.processAndMatchDocument(
      "./temp/" + documentName,
      filters
    );
    resultsMap.set(index, match);
    // console.log(resultsMap); // *******************
  }

  //Takes in a pdf's location and list of fields to be matched
  async processAndMatchDocument(pdfLocation, fieldsList) {
    const matchMap = await this.documentAI.processDocument(pdfLocation);
    //   console.log(matchMap); //undefined until promise resolves
    const matches = Matcher.match(fieldsList, matchMap);
    return matches;
  }
}

module.exports = AnalyzePDFs;
