require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')
const sendWebhook = require('../../etc/sendWebhook')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send()
    }
    var { error } = await supabase
        .from('records')
        .delete()
        .eq('levelID', req.params.id)
    var { error } = await supabase
        .from('levels')
        .delete()
        .eq('id', req.params.id)
    console.log(error)
    if(error) return res.status(500).send(error)
    res.send()
    sendWebhook.log(`${req.user.name} (${req.user.uid}) deleted level ${req.params.id}`)
}