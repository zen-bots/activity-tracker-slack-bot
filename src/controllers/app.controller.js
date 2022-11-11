const mailSender = require("../helpers/mail")

/* GET home page. */
const landing = (req, res) => {
    res.render('landing', { title: 'teamQ-Use queue to manage you internal resources' })
}

/* GET email page. */
const email = (req, res) => {
    res.render('email', { title: 'teamQ-Use queue to manage you internal resources' })
}


/* POST email form request */
const postEmail = async (req, res) => {
    // Collecting required information from the Request Body
    const { name, email, message } = req.body
    try {
        // Sending the email
        await mailSender.sendContactEmail({ to: email, name, message })
        res
            .status(200)
            .json({
                message: 'Email sent successfully',
                data: { name, email, message },
                success: true
            });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({
                message: 'Unable to process request',
                data: {},
                success: false,
            })
    }

}

module.exports = {
    landing,
    email,
    postEmail
}
