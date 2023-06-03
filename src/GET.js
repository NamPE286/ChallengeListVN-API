/** @type {import("express").RequestHandler} */
module.exports = (req, res) => {
    res.send({message: 'server ok'})
}