require('dotenv').config()
const fetch = require('cross-fetch')

function sendLog(content) {
    fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: content
        })
    })
}
module.exports = sendLog