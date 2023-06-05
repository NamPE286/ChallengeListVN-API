require('dotenv').config()
require('module-alias/register')
/** @type {import("@supabase/supabase-js").SupabaseClient} */
const supabase = require('@config/db')

const jwt = require('jsonwebtoken')

async function getUser(userdata){
    var { data, error } = await supabase
        .from('players')
        .insert({
            uid: userdata.sub,
            name: userdata.user_metadata.full_name,
            email: userdata.user_metadata.email
        })
    var { data, error } = await supabase
        .from('players')
        .select()
        .eq('uid', userdata.sub)
        .single()
    return data
}

/** @type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
    if (!req.headers.authorization.startsWith('Bearer')) {
        return res.status(403).send()
    }
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(decoded) {
            req['user'] = await getUser(decoded)
            next()
            return
        }
        return res.status(403).send()
    })
}