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

    res.sort((a, b) => a.data.timestamp > b.data.timestamp ? 1 : -1)

    if(res.length <= 5) {
        return res
    }

    return res.slice(0, 5)
}

async function getData(uid) {
    var { data, error } = await supabase
        .from('players')
        .select()
        .eq('uid', uid)
        .single()

    if(error) {
        throw error
    }

    return data
}

async function getRecords(uid, option) {
    var { data, error } = await supabase
        .from('records_view')
        .select('*, levels!inner(*, players!levels_creatorUID_fkey(*))')
        .eq('userUID', uid)
        .eq('accepted', true)
        .eq('levels.accepted', true)
        .order('rating', { ascending: false })
        .range(option.range.index.start, option.range.index.end)

    if(error) {
        throw error
    }

    return data
}

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

    res.send({
        recentActivities: await getRecentActivities(uid),
        data: await getData(uid),
        records: await getRecords(uid, option),
        levels: await getLevels(uid, option)
    })
}