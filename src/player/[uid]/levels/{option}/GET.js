require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

async function getLevels(uid, option) {
    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*))')
        .eq('creatorUID', uid)
        .eq('accepted', true)
        .order('id', { ascending: false })
        .range(option.range.index.start, option.range.index.end)
    
    if(error) {
        throw error
    }

    return data
}

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    let option = JSON.parse(JSON.stringify(require('@config/defaultOption')))
    if (req.params.option) {
        const a = JSON.parse(decodeURIComponent(req.params.option))
        for (const i in a) {
            option[i] = a[i]
        }
    }

    const { uid } = req.params

    res.send(await getLevels(uid, option))
}