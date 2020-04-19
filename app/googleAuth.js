const {auth} = require('google-auth-library')

// load the environment variable with our keys
const keysEnvVar = process.env.CREDS
if (!keysEnvVar) {
  throw new Error('The $CREDS environment variable was not found!')
}
const keys = JSON.parse(keysEnvVar)

async function googleAuth() {
  // load the JWT or UserRefreshClient from the keys
  const client = auth.fromJSON(keys)
  client.scopes = ['https://www.googleapis.com/auth/cloud-platform']
  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`
  const res = await client.request({url})
}

module.exports = googleAuth