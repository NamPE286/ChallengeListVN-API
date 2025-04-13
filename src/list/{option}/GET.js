require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    let option = JSON.parse(JSON.stringify(require('@config/defaultOption')))
    if (req.params.option) {
        const a = JSON.parse(decodeURIComponent(req.params.option))
        for(const i in a){
            option[i] = a[i]
        }
    }

    var x = supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*)')
        .order(option.filter.sortBy, { ascending: option.filter.ascending })
        .gte('rating', option.range.rating.start)
        .lte('rating', option.range.rating.end)
        .eq('accepted', true)
        .range(option.range.index.start, option.range.index.end)

    if(option.filter.length != 0) {
        console.log('ok')
        x = x.eq('length', option.filter.length)
    }

    const { data, error } = await x;

    if (error) res.status(500).send(error)
    else res.send(data)
}
