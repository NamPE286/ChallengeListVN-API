require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    const submission = req.body
    var { data, error } = await supabase
        .from('records')
        .insert(submission)
    if (error) {
        return res.status(500).send(error)
    }
    var { data, error } = await supabase
        .from('records')
        .select()
        .eq('userUID', submission.userUID)
        .eq('levelID', submission.levelID)
        .single()
    res.send(data)
}