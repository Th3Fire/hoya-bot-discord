// const {auth, GoogleAuth} = require('google-auth-library')

// // load the environment variable with our keys
// const keysEnvVar = process.env.CREDS
// if (!keysEnvVar) {
//   throw new Error('The $CREDS environment variable was not found!')
// }
// const keys = JSON.parse(keysEnvVar)

// console.log(keys)

// const fs = require('fs')

// const content = keysEnvVar

// fs.writeFile('./test.txt', content, err => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   //file written successfully
// })

// async function googleAuth() {

//   // load the JWT or UserRefreshClient from the keys
//   const client = auth.fromJSON(keys);
//   client.scopes = ['https://www.googleapis.com/auth/cloud-platform'];
//   const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
//   const res = await client.request({url});
//   console.log(res.data);

// }


// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.

async function googleAuth() {
  const storage = new Storage({
    projectId: 'translation-261014',
    keyFilename: './google_credentials.json'
  })

  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets();
  
    const [buckets] = results;
  
    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}

module.exports = googleAuth