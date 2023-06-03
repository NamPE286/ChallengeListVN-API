require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

let option = require('@config/defaultOption')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if (req.params.option) {
        option = req.params.option
    }
    const { data, error } = await supabase
        .from('players')
        .select()
        .order('rating', { ascending: false })
        .gte('rating', option.range.rating.start)
        .lte('rating', option.range.rating.end)
        .range(option.range.index.start, option.range.index.end)
    if (error) res.status(500).send(error)
    else res.send(data)
}