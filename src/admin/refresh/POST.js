require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    console.log(req.user)
    if(!req.user.isAdmin){
        return res.status(403).send()
    }
    await supabase.rpc('updateRating')
    res.send()
}