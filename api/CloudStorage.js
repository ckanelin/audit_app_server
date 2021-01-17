require("dotenv-flow").config({ silent: true });
const { Storage } = require("@google-cloud/storage");

class CloudStorage {
  constructor() {
    this.storage = new Storage();
    this.bucketName = "avpdf";
    this.destinationPath = "./temp/";
  }

  // C:/Users/Richard/VSCodeProjects/audit_app_server/temp/

  // srcFilename = 'Remote file to download, e.g. file.txt';
  async downloadFile(srcFilename) {
    const destFilename = srcFilename; //'Local destination for file, e.g. ./local/path/to/file.txt';
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: this.destinationPath + destFilename,
    };

    // Downloads the file
    await this.storage
      .bucket(this.bucketName)
      .file(srcFilename)
      .download(options);

    console.log(
      `gs://${this.bucketName}/${srcFilename} downloaded to ${destFilename}.`
    );
  }
}

module.exports = CloudStorage;
