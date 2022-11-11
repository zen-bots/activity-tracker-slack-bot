const router = require('express').Router()

const { landing, email, postEmail } = require('./controllers/app.controller')
const { save, leaderboard, mostActiveActivityOfUser } = require('./controllers/activity.controller')
const { validate, validateTime } = require('./helpers/validator')

router.get('/', landing);
router.get('/email', email);
// validate each post requests first then route
router.post('/save', validateTime, save);
router.post('/leaderboard', validate, leaderboard);
router.post('/mostactiveacitiviesofusers', validate, mostActiveActivityOfUser);

router.post('/email', postEmail);

module.exports = router;