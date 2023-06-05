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
            .select('*')
            .eq('id', query)
        res.status(200).send({
            levels: [data],
            players: []
        })
        return
    }
    if(uuid.validate(query)){
        var { data, error } = await supabase
            .from('players')
            .select('*')
            .eq('uid', query)
        res.status(200).send({
            levels: [],
            players: [data]
        })
        return   
    }
    var m = {}
    var { data, error } = await supabase
        .from('levels')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(15)
    for (var i = 0; i < data.length; i++) {
        m[data[i].id] = data[i]
    }
    var { data, error } = await supabase
        .from('players')
        .select('name, uid, isHidden')
        .ilike('name', `%${query}%`)
        .eq('isHidden', false)
        .limit(15)
    var players = []
    for (var i = 0; i < data.length; i++) {
        players.push({
            id: data[i].uid,
            name: data[i].name
        })
    }
    var levels = []
    for (const i in m) {
        levels.push(m[i])
    }
    res.status(200).send({
        levels: levels,
        players: players
    })
}