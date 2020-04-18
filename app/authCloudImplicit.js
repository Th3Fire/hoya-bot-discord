// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage')
const {Translate} = require('@google-cloud/translate').v2

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage()

async function authCloudImplicit() {
    try {
        // Makes an authenticated API request.
        const results = await storage.getBuckets()
        const [buckets] = results
        buckets.forEach((bucket) => {
          console.log(bucket.name)
        })
    } catch (error) {
        console.error('ERROR:', error)
    }
}

module.exports = authCloudImplicit