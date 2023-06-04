require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

let option = require('@config/defaultOption')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if (req.params.option) {
        const a = JSON.parse(decodeURIComponent(req.params.option))
        for (const i in a) {
            option[i] = a[i]
        }
    }
    const { id } = req.params
    var resData = {
        data: {},
        records: []
    }
    var { data, error } = await supabase
        .from('levels')
        .select()
        .eq('id', id)
        .single()
    resData.data = data
    var { data, error } = await supabase
        .from('records')
        .select('*, players(*)')
        .eq('levelID', id)
        .eq('accepted', true)
        .range(option.range.index.start, option.range.index.end)
    resData.records = data
    if(error) res.status(500).send(error)
    else res.send(resData)
}