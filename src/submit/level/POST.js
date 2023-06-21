require('module-alias/register')
const sendWebhook = require('../../../etc/sendWebhook')

/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    const submission = req.body
    submission['accepted'] = false
    var { data, error } = await supabase
        .from('levels')
        .insert(submission)
    if (error) {
        return res.status(409).send()
    }
    res.send(submission)
    sendWebhook.notice('New level submitted! Please check it out.')
}