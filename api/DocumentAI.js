require("dotenv-flow").config({ silent: true });
const {
  DocumentProcessorServiceClient,
} = require("@google-cloud/documentai").v1beta3;
const fs = require("fs").promises;

class DocumentAI {
  constructor() {
    this.projectId = process.env.PROJECT_ID;
    this.location = "us"; // Format is 'us' or 'eu'
    this.processorId = process.env.PROCESSOR_ID; // Create processor in Cloud Console

    // Instantiates a client
    this.client = new DocumentProcessorServiceClient();
  }

  async processDocument(filePath) {
    // The full resource name of the processor, e.g.:
    // projects/project-id/locations/location/processor/processor-id
    // You must create new processors in the Cloud Console first
    const name = `projects/${this.projectId}/locations/${this.location}/processors/${this.processorId}`;

    // Read the file into memory.
    // const fs = require("fs").promises;
    const imageFile = await fs.readFile(filePath);

    // Convert the image data to a Buffer and base64 encode it.
    const encodedImage = Buffer.from(imageFile).toString("base64");

    const request = {
      name,
      document: {
        content: encodedImage,
        mimeType: "application/pdf",
      },
    };

    // Recognizes text entities in the PDF document
    const [result] = await this.client.processDocument(request);
    const { document } = result;

    // Get all of the document text as one big string
    const { text } = document;

    // Extract shards from the text field
    const getText = (textAnchor) => {
      if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
        return "";
      }

      // First shard in document doesn't have startIndex property
      const startIndex = textAnchor.textSegments[0].startIndex || 0;
      const endIndex = textAnchor.textSegments[0].endIndex;

      return text.substring(startIndex, endIndex);
    };

    // Read the text recognition output from the processor
    // console.log("The document contains the following paragraphs:");
    const [page1] = document.pages;

    // const { paragraphs } = page1;

    // for (const paragraph of paragraphs) {
    //   const paragraphText = getText(paragraph.layout.textAnchor);
    //   console.log(`Paragraph text:\n${paragraphText}`);
    // }

    // Form parsing provides additional output about
    // form-formatted PDFs. You  must create a form
    // processor in the Cloud Console to see full field details.
    // console.log("\nThe following form key/value pairs were detected:");

    const { formFields } = page1;
    const extractedPairs = new Map();
    for (const field of formFields) {
      const fieldName = getText(field.fieldName.textAnchor).trim();
      const fieldValue = getText(field.fieldValue.textAnchor).trim();

      // console.log("Extracted key value pair:");
      // console.log(`\t(${fieldName}, ${fieldValue})`);

      extractedPairs.set(fieldName, fieldValue);
    }
    // console.log(extractedPairs);
    //Returns a Map (key value pairs) extracted from the document
    return extractedPairs;
  }
}

module.exports = DocumentAI;
