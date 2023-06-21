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
        .select('rating')
        .eq('id', submission.levelID)
        .single()
    if(error) {
        return res.status(404).send()
    }
    if(!data.rating) {
        return res.status(406).send()
    }
    var { data, error } = await supabase
        .from('records')
        .insert(submission)
    if (error) {
        return res.status(409).send()
    }
    res.send(submission)
    sendWebhook.notice('New record submitted! Please check it out.')
}