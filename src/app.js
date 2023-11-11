const fs = require('fs');
const csvParser = require('csv-parser');

const csvFilePath = './input.csv';
const jsonlFilePath = './output.jsonl';

const transformCsvToJson = (csvData) => {
  const jsonData = csvData.map((row) => {
    const obj = {};
    for (let i = 0; i < row.length; i++) {
      obj[`header${i + 1}`] = row[i];
    }
    return JSON.stringify(obj);
  });
  return jsonData.join('\n');
};

const convertCsvToJsonl = async () => {
  const csvStream = fs.createReadStream(csvFilePath);
  const jsonlStream = fs.createWriteStream(jsonlFilePath);

  csvStream.pipe(csvParser())
    .on('data', (data) => {
      const jsonData = transformCsvToJson([data]);
      jsonlStream.write(jsonData);
    })
    .on('end', () => {
      console.log('CSV to JSONL conversion complete!');
    });
};

convertCsvToJsonl();
