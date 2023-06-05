require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    const submission = req.body
    var { data, error } = await supabase
        .from('levels')
        .insert(submission)
    if (error) {
        return res.status(500).send(error)
    }
    var { data, error } = await supabase
        .from('levels')
        .select()
        .eq('id', submission.id)
    res.send(data)
}