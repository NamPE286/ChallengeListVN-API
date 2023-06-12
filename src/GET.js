/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    res.send({timestamp: (new Date()).toISOString()})
}