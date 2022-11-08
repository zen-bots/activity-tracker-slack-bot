const handleResponse = require('./responseHandler')
const commandParser = require('./commandParser')

const validate = async (req, res, next) => {
    console.info('Validating incoming request.')
    const { body } = req

    // validate body & slack token
    bodyValidation(body)
    tokenValidation(body)

    next()
}

const validateTime = async (req, res, next) => {
    console.info('Validating incoming time request.')
    const { body } = req

    // validate body & slack token & time
    bodyValidation(body)
    tokenValidation(body)
    res.locals.time = commandParser(body.text)
    timeValidation(res.locals.time)

    next()
}

const bodyValidation = (body) => {
    if (!body) {
        console.error('Invalid body')
        return res.status(400)
            .json({
                text: '',
                attachments: [handleResponse(new Error('Invalid body'))]
            })
    }
}

const tokenValidation = (body) => {
    if (!body.token || process.env.SLACK_TOKEN !== body.token) {
        console.error('Invalid token!')
        return res.status(400)
            .json({
                text: '',
                attachments: [handleResponse(new Error('Invalid token'))]
            })
    }
}

const timeValidation = (time) => {
    if (!time) {
        return res.status(400).json({
            text: '',
            attachments: [handleResponse(new Error('No time value (as number) found in the message'))]
        })
    } else if (time == 0) {
        return res.status(400).json({
            text: '',
            attachments: [handleResponse(new Error('Please enter a value bigger than zero'))]
        })
    } else if (time.length > 3) {
        return res.status(400).json({
            text: '',
            attachments: [handleResponse(new Error('Dude !\nHow did you do that much.\nPlease enter a value under 1000'))]
        })
    }
}

module.exports = {
    validate,
    validateTime
}