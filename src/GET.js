/** @type {import("express").RequestHandler} */
module.exports = (req, res) => {
    console.log(req)
    res.send({message: 'server ok'})
}