const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('./assets/Stock.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('stock.json', JSON.stringify(results, null, 2));
    console.log('CSV file successfully converted to JSON');
  });