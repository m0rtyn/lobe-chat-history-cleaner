const { cleanHistory } = require('./clean-history.js');
const { toMarkdown } = require('./to-markdown.js');

const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Ошибка: Укажите путь к входному JSON файлу.');
  process.exit(1);
}

const output = cleanHistory(inputFile);
if (!output?.outputData || !output?.outputFile) {
  console.error('Ошибка: Не удалось очистить историю или сохранить файл.');
  process.exit(1);
}
const { outputData, outputFile } = output;
// console.log("🚀 ~ file: process-chat-history.js ~ var:  outputData, outputFile", outputData, outputFile)
fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), 'utf8');
console.log(`Очищенная история сохранена в ${outputFile}`);

const outputMd = toMarkdown(outputFile);
if (!outputMd?.markdownContent || !outputMd?.outputFile) {
  console.error('Ошибка: Не удалось преобразовать историю в Markdown.');
  process.exit(1);
}
const { markdownContent, outputFile: markdownFile } = outputMd;

fs.writeFileSync(markdownFile, markdownContent, 'utf8');
console.log(`Markdown файл сохранен в ${markdownFile}`);
