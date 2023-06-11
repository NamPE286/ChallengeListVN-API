require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    const { data, error } = await supabase
        .from('records')
        .select()
        .eq('levelID', req.params.levelID)
        .eq('userUID', req.params.userUID)
        .single()
    console.log(error)
    if(error) return res.status(500).send(error)
    res.send(data)
}