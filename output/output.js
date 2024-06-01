const axios = require('axios');

module.exports = function code__result(language, code, input) {
  const extToLanguageMap = new Map();
  extToLanguageMap.set('py', 'python');
  extToLanguageMap.set('js', 'javascript');
  extToLanguageMap.set('cpp', 'cpp');
  extToLanguageMap.set('java', 'java');

  let data = JSON.stringify({
    "language": extToLanguageMap.get(language),
    "stdin": input,
    "files": [
      {
        "name": `index.${language}`,
        "content": `${code}`,
      }
    ]
  });

  var config = {
    method: 'post',
    url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
    headers: {
      'x-rapidapi-key': '75b4464accmsh3d3adf342cb2487p178f4ejsn6a6f2f0bf31b',
      'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}