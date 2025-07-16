const fs = require('fs');
const path = require('path');

// // Используем process.argv для получения пути к файлу из аргументов командной строки
// const inputFile = process.argv[2];
// if (!inputFile) {
//   console.error('Ошибка: Укажите путь к входному JSON файлу.');
//   process.exit(1);
// }

const cleanHistory = (inputFile) => {
  try {
    const originalName = path.basename(inputFile, path.extname(inputFile));
    const outputFile = path.join(path.dirname(inputFile), `${originalName}-cleaned.json`);
    const data = fs.readFileSync(inputFile, 'utf8');
    const jsonData = JSON.parse(data);

    const messages = jsonData?.data?.messages ?? jsonData?.messages

    if (!messages || !Array.isArray(messages)) {
      console.trace();
      throw Error('Ошибка: поле "messages" не найдено или не является массивом в предоставленном JSON.');
    }

    const cleanedMessages = messages.map(msg => ({
      content: msg.content,
      role: msg.role,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
    }));

    cleanedMessages.sort((a, b) => new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime());

    const outputData = {
      messages: cleanedMessages
    };

    return { outputData, outputFile };
  } catch (parseErr) {
    throw Error(`Ошибка парсинга JSON: ${parseErr}`);
  }
};

module.exports = { cleanHistory };