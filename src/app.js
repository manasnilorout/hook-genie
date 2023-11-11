const fs = require('fs');
const csvParser = require('csv-parser');

const csvFilePath = 'src/training-file/JavaScript Hooks Training - Day - 1.csv';
const jsonlFilePath = './src/output/output.jsonl';

const transformCsvToJson = ({ question, answer }) => {
  const jsonData = JSON.stringify({
    messages: [
      { role: 'system', content: 'Hook Genie is an assistant created to help developers in generating javascript hooks' },
      { role: 'user', content: question },
      { role: 'assistant', content: answer }
    ]
  });

  return jsonData + '\n';
};

const convertCsvToJsonl = async () => {
  const csvStream = fs.createReadStream(csvFilePath);
  const jsonlStream = fs.createWriteStream(jsonlFilePath);

  csvStream.pipe(csvParser())
    .on('data', (data) => {
      const jsonData = transformCsvToJson(data);
      jsonlStream.write(jsonData);
    })
    .on('end', () => {
      console.log('CSV to JSONL conversion complete!');
    });
};

convertCsvToJsonl();
