require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')
const uuid = require('uuid')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    var { query } = req.params
    if (!isNaN(query)) {
        var { data, error } = await supabase
            .from('levels')
            .select('*, players!levels_creatorUID_fkey(*)')
            .eq('id', query)
        res.status(200).send({
            levels: data,
            players: []
        })
        return
    }
    if(uuid.validate(query)){
        var { data, error } = await supabase
            .from('players')
            .select('name, uid, isHidden')
            .eq('uid', query)
            .eq('isHidden', false)
        res.status(200).send({
            levels: [],
            players: data
        })
        return   
    }
    var m = {}
    var { data, error } = await supabase
        .from('levels')
        .select('*, players!levels_creatorUID_fkey(*)')
        .ilike('name', `%${query}%`)
        .limit(8)
    for (var i = 0; i < data.length; i++) {
        m[data[i].id] = data[i]
    }
    var { data, error } = await supabase
        .from('players')
        .select('name, uid, googleAvatarID')
        .ilike('name', `%${query}%`)
        .eq('isHidden', false)
        .limit(8)
    var players = data
    var levels = []
    for (const i in m) {
        levels.push(m[i])
    }
    res.status(200).send({
        levels: levels,
        players: players
    })
}