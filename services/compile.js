const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const languageExtensionsMap = {
  py: 'python',
  js: 'javascript',
  cpp: 'cpp',
  java: 'java'
};


const CodeCompile = async (fileExtension, sourceCode, input) => {
  const programmingLanguage = languageExtensionsMap[fileExtension];

  if (!programmingLanguage) {
    throw new Error('Unsupported file extension');
  }

  const requestData = JSON.stringify({
    language: programmingLanguage,
    stdin: input,
    files: [
      {
        name: `index.${fileExtension}`,
        content: sourceCode
      }
    ]
  });

  const requestConfig = {
    method: 'post',
    url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: requestData
  };

  try {
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    return error;
  }
}

module.exports = CodeCompile;
