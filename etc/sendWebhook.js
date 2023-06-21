require('dotenv').config()
const fetch = require('cross-fetch')

function log(content) {
    fetch(process.env.DISCORD_WEBHOOK_URL_LOG, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: content
        })
    })
}
function notice(content) {
    fetch(process.env.DISCORD_WEBHOOK_URL_NOTICE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: content
        })
    })
}
module.exports = {
    log: log,
    notice: notice
}