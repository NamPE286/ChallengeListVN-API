require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

async function getRecentActivities(uid) {
    const res = []

    var { data, error } = await supabase
        .from('records_view')
        .select('*, levels!inner(*, players!levels_creatorUID_fkey(*))')
        .eq('userUID', uid)
        .eq('accepted', true)
        .eq('levels.accepted', true)
        .order('timestamp', { ascending: false })
        .limit(5)

    for(const i of data) {
        res.push({
            type: 'record',
            data: i
        })
    }

    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*))')
        .eq('creatorUID', uid)
        .eq('accepted', true)
        .order('timestamp', { ascending: false })
        .limit(5)

    for(const i of data) {
        res.push({
            type: 'level',
            data: i
        })
    }

    res.sort((a, b) => a.data.timestamp < b.data.timestamp ? 1 : -1)

    if(res.length <= 5) {
        return res
    }

    return res.slice(0, 5)
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

    res.send(await getRecentActivities(uid, option))
}