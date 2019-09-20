const request = require('request');
const config = require('./config')

const { simsimiOption } = config

const sim = (text) => {
  const options = { 
    method: 'POST',
    url: 'https://wsapi.simsimi.com/190410/talk/',
    headers: { 
      'x-api-key': 'YkwONF8Ehqssheq1nh9rLyupqEhWjspzC67fT3Rs',
      'Content-Type': 'application/json' 
    },
    body: { 
      utext: text,
      lang: simsimiOption.lang,
      atext_bad_prob_max: simsimiOption.filter
    },
    json: true 
  }
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error)
      resolve(body)
    })
  })
}

module.exports = {
  simsimi: (text) => sim(text)
}