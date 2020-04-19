const request = require('request');
const config = require('./config')

const { simsimiOption } = config

const sim = (text) => {
  const options = { 
    method: 'POST',
    url: 'https://wsapi.simsimi.com/190410/talk/',
    headers: { 
      'x-api-key': simsimiOption.SIM_KEY,
      'Content-Type': 'application/json' 
    },
    body: { 
      utext: text,
      lang: simsimiOption.SIM_LC,
      // atext_bad_prob_max: simsimiOption.SIM_BAD_PROB_MAX,
      atext_bad_prob_min: simsimiOption.SIM_BAD_PROB_MIN,
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