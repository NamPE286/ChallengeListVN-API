require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send()
    }
    const { error } = await supabase
        .from('records')
        .delete()
        .eq('levelID', req.params.levelID)
        .eq('userUID', req.params.userUID)
    console.log(error)
    if(error) return res.status(500).send(error)
    res.send()
    sendWebhook.log(`${req.user.name} (${req.user.uid}) deleted ${req.params.userUID} record of ${req.params.levelID}`)
}