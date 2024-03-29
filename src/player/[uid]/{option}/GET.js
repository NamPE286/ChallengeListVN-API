require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

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

    res.send(await getData(uid))
}