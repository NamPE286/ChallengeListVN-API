require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    let option = JSON.parse(JSON.stringify(require('@config/defaultOption')))
    if (req.params.option) {
        const a = JSON.parse(decodeURIComponent(req.params.option))
        for (const i in a) {
            option[i] = a[i]
        }
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