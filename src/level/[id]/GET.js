/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('../../../config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from('levels')
        .select()
        .eq('id', id)
        .single()
    if(error) res.status(500).send(error)
    else res.send(data)
}