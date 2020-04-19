const { Translate } = require('@google-cloud/translate').v2
const translate = new Translate()

module.exports = async function({ text, target }) {
    const [translation] = await translate.translate(text, target)
    return translation
}
