require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if (!req.user.isAdmin && !req.user.uid == req.body.uid) {
        return res.status(403).send()
    }
    try{
        delete req.body.isAdmin
        delete req.body.isBanned
    }
    catch{}
    const { error } = await supabase
        .from('players')
        .update(req.body)
        .eq('uid', req.body.uid)
    console.log(error)
    if (error) return res.status(500).send(error)
    res.send(req.body)
}