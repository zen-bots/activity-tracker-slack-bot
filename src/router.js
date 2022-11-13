const router = require('express').Router()

// validator
const { validate, validateTime } = require('./helpers/validator')

// controllers
const { landing } = require('./controllers/app.controller')
const { contact, postEmail } = require('./controllers/email.controller')
const { save, leaderboard, mostActiveActivityOfUser } = require('./controllers/activity.controller')

router.get('/', landing);

router.get('/contact', contact);
router.post('/email', postEmail);

// validate each post requests first then route
router.post('/save', validateTime, save);
router.post('/leaderboard', validate, leaderboard);
router.post('/mostactiveacitiviesofusers', validate, mostActiveActivityOfUser);

module.exports = router;