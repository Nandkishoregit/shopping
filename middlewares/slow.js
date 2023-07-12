
function slow(req, res, next) {
    const slow = parseInt(req.query.slow)
    if (!slow) {
        next()
    } else {
        setTimeout(() => {
            next()
        }, slow * 1000)
    }
}

module.exports = { slow }


