const axios = require('axios');

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
      'x-rapidapi-key':'75b4464accmsh3d3adf342cb2487p178f4ejsn6a6f2f0bf31b',
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
