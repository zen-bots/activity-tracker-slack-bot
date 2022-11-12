/* GET home page. */
const landing = (req, res) => {
    res.render('landing', { title: 'aT is your activity tracking frien to increase engagement among your colleagues!' })
}

module.exports = {
    landing
}
