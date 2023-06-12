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
    const { uid } = req.params
    var resData = {
        data: {},
        records: [],
        levels: []
    }
    var { data, error } = await supabase
        .from('players')
        .select()
        .eq('uid', uid)
        .single()
    resData.data = data
    var { data, error } = await supabase
        .from('records_view')
        .select('*, levels!inner(*, players!levels_creatorUID_fkey(*))')
        .eq('userUID', uid)
        .eq('accepted', true)
        .eq('levels.accepted', true)
        .order('rating', { ascending: false })
        .range(option.range.index.start, option.range.index.end)
    resData.records = data
    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*))')
        .eq('creatorUID', uid)
        .eq('accepted', true)
        .order('timestamp', { ascending: false })
        .range(option.range.index.start, option.range.index.end)
    resData.levels = data
    if (error) res.status(500).send(error)
    else res.send(resData)
}