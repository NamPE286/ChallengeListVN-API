require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    var start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*)')
        .eq('dailyStart', start.toDateString())
        .single()
    console.log(start.toDateString())
    if (error) res.status(500).send({
        error: error,
        test: start.toDateString()
    })
    else res.send(data)
}