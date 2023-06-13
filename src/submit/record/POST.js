require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    const submission = req.body
    submission['accepted'] = false
    var { data, error } = await supabase
        .from('levels')
        .select('rating')
        .eq('id', submission.levelID)
        .single()
    console.log(data, error)
    if(error) {
        return res.status(404).send()
    }
    if(!data.rating) {
        return res.status(406).send()
    }
    var { data, error } = await supabase
        .from('records')
        .insert(submission)
    if (error) {
        return res.status(409).send()
    }
    res.send(submission)
}