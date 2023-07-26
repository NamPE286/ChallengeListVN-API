require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')
const sendWebhook = require('../../etc/sendWebhook')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send()
    }
    const { error } = await supabase
        .from('records')
        .update(req.body)
        .eq('levelID', req.body.levelID)
        .eq('userUID', req.body.userUID)
    console.log(error)
    if(error) return res.status(500).send(error)
    res.send(req.body)
    sendWebhook.log(`${req.user.name} (${req.user.uid}) modified ${req.body.userUID} record of ${req.body.levelID}`)
}