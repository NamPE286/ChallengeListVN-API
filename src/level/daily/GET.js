require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

let option = require('@config/defaultOption')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    var start = new Date();
    start.setUTCHours(24, 0, 0, 0);
    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*)')
        .eq('dailyStart', start.toISOString())
        .single()
    if (error) res.status(500).send(error)
    else res.send(data)
}