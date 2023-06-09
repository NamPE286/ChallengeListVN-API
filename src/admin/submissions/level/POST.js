require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if(!req.user.isAdmin){
        return res.status(403).send()
    }
    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*)')
        .eq('accepted', false)
    if(error){
        return res.status(500).send(error)
    }
    res.send(data)
}