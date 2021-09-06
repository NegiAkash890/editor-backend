const axios = require('axios') ;


module.exports = function code__result(language, code, input){

  let data = JSON.stringify({
    "code":`${code}`,
    "language":language,
    "input":input
    });
    
    var config = {
        method: 'post',
        url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
      .then(function (response) {
          return response.data;
      })
      .catch(function (error) {
          let err = new Error(error) ;
          return err ;
      });
}