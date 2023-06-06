require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    var result = {
        levels: [],
        records: []
    }
    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*)')
        .eq('creatorUID', req.user.uid)
        .eq('accepted', false)
    result.levels = data
    var { data, error } = await supabase
        .from('records')
        .select('*, levels(*, players!levels_creatorUID_fkey(*))')
        .eq('userUID', req.user.uid)
        .eq('accepted', false)
    result.records = data
    res.send(result)
}