const AnalyzePDFs = require("../model/AnalyzePDFs.js");

const handlePDFUpload = (req, res, db) => {
  const text = req.body;
  const pdfCollections = db.collection("pdf");

  pdfCollections.remove();
  pdfCollections
    .insertMany(text)
    .then((results) => {
      res.send("success");
    })
    .catch((error) => {
      res.status(400).json("Cannot upload pdfs");
    });
};

async function handlePDFDownload(req, res, db) {
  const text = req.body;
  const pdfCollections = db.collection("pdf");

  pdfCollections
    .find()
    .toArray()
    .then((results) => {
      const analyzePDFs = new AnalyzePDFs();
      const arrayLength = results.length;
      const sampleUploadMap = new Map();

      for (i = 0; i < arrayLength; i++) {
        sampleUploadMap.set(results[i].id, results[i].name);
      }

      analyzePDFs
        .analyze(sampleUploadMap, ["Total", "Tax"])
        .then((value) => {
          return value;
        })
        .then((data) => {
          const jsonObj = new Object();
          for (value of data) {
            jsonObj[value[0]] = Object.fromEntries(value[1]);
          }
          res.send(jsonObj);
        });
    })
    .catch((error) => console.error(error));
}

function replacer(key, value) {
  const originalObject = this[key];
  if (originalObject instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
    };
  } else {
    return value;
  }
}

function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}

module.exports = {
  handlePDFUpload: handlePDFUpload,
  handlePDFDownload: handlePDFDownload,
};
