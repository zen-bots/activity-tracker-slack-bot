/* GET home page. */
const landing = (req, res) => {
    res.render('landing', { title: 'teamQ-Use queue to manage you internal resources' })
}

module.exports = {
    landing
}
