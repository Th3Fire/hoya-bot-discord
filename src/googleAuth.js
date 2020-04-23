// Imports the Google Cloud client library.
const { Storage } = require('@google-cloud/storage')

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
    const results = await storage.getBuckets()
    const [buckets] = results
    console.log('Buckets:')
    buckets.forEach((bucket) => {
      console.log(bucket.name)
    });
  } catch (err) {
    console.error('ERROR:', err)
  }
}

module.exports = googleAuth