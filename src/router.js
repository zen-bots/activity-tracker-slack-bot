const router = require('express').Router()

const { landing } = require('./controllers/landing.controller')
const { save, leaderboard, mostActiveActivityOfUser } = require('./controllers/activity.controller')
const { validate, validateTime } = require('./validator')

router.get('/', landing);
// validate each post requests first then route
router.post('/save', validateTime, save);
router.post('/leaderboard', validate, leaderboard);
router.post('/mostactiveacitiviesofusers', validate, mostActiveActivityOfUser);

module.exports = router;