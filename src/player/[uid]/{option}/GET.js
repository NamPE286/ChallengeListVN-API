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
    const { uid } = req.params
    var resData = {
        data: {},
        records: []
    }
    var { data, error } = await supabase
        .from('players')
        .select()
        .eq('uid', uid)
        .single()
    resData.data = data
    var { data, error } = await supabase
        .from('records')
        .select('*, levels(*)')
        .eq('userUID', uid)
        .eq('accepted', true)
        .range(option.range.index.start, option.range.index.end)
        .order('timestamp', { ascending: false })
    resData.records = data
    if (error) res.status(500).send(error)
    else res.send(resData)
}