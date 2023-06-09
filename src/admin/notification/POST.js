require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if(!req.user.isAdmin){
        return res.status(403).send()
    }
    const { error } = await supabase
        .from('notifications')
        .insert(req.body)
    if(error) res.status(500).send()
    else res.send(req.body)
}