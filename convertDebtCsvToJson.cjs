// convertDebtCsvToJson.js
const fs = require('fs');
const Papa = require('papaparse');

// Load raw CSV file
console.log('📥 Loading CSV file...');
const csvFile = fs.readFileSync('./public/data/us-debt.csv', 'utf8');
console.log('✅ CSV file loaded!, length:', csvFile.length);

// Parse it
const parsed = Papa.parse(csvFile, {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
});

console.log('📊 Parsed rows count:', parsed.data.length);

// Format as JS array of objects
const result = parsed.data.map(row => ({
  year: Number(row['End of Fiscal Year']),
  debt: Number(row['US Debt Outstanding (Billion USD)']),
  netPosition: Number(row['US Net Position (Billion USD)']),
  difference: Number(row['Difference (Billion USD)']),
}));

// Save to a JS module
const output = `export const debtData = ${JSON.stringify(result, null, 2)};\n`;

console.log('Writing JS module...');
fs.writeFileSync('./src/data/debtData.js', output, 'utf8');

console.log('✅ debtData.js created successfully!');
