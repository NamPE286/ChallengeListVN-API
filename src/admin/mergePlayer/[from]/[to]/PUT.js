require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    if(!req.user.isAdmin){
        return res.status(403).send()
    }
    const { from, to } = req.params
    
    var { error } = await supabase
        .from('records')
        .update({userUID: to})
        .eq('userUID', from)
    console.log(error)
    var { error } = await supabase
        .from('levels')
        .update({creatorUID: to})
        .eq('creatorUID', from)
    console.log(error)
    var { error } = await supabase
        .from('players')
        .delete()
        .eq('uid', from)
    if(error) return res.status(500).send()
    res.send()
}