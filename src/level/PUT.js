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
        .from('levels')
        .update(req.body)
        .eq('id', req.body.id)
    console.log(error)
    if(error) return res.status(500).send(error)
    res.send(req.body)
    sendWebhook.log(`${req.user.name} (${req.user.uid}) modified level ${req.body.id}`)
}