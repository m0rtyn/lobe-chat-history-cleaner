const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Ошибка: Укажите путь к входному JSON файлу.');
  process.exit(1);
}

const originalName = path.basename(inputFile, path.extname(inputFile));
const outputFile = path.join(path.dirname(inputFile), `memory_${originalName}.md`);

const toMarkdown = (inputFile, userName, assistantName) => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');

    const jsonData = JSON.parse(data);
    const messages = jsonData.messages;

    if (!messages || !Array.isArray(messages)) {
      console.trace();
      throw Error('Ошибка: поле "messages" не найдено или не является массивом в предоставленном JSON.');
    }

    let markdownContent = '';

    messages.forEach(m => {
      const name = m.role === 'user' ? userName : m.role === 'assistant' ? assistantName : m.role;
      const paragraphs = m.content
        .split('\n')
        .map(p => p.trim())
        .filter(p => p)
        .join('\n');

      markdownContent += `**${name}:**\n`;
      markdownContent += `${paragraphs}\n\n`;
      // markdownContent += `<!-- ${m.createdAt} / ${m.updatedAt} -->\n\n`;
    });

    return { markdownContent, outputFile };
  } catch (parseErr) {
    console.error(`Ошибка парсинга JSON: ${parseErr}`);
  }
}

module.exports = { toMarkdown };