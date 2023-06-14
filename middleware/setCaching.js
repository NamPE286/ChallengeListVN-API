/** @type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
    res.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=3600')
    next()
}