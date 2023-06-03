require('module-alias/register')
const supabase = require('@config/db')

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    const { uid } = req.params
    const { data, error } = await supabase
        .from('players')
        .select()
        .eq('uid', uid)
        .single()
    if (error) res.status(500).send(error)
    else res.send(data)
}