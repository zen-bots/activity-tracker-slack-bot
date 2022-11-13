const mailSender = require("../helpers/mail")

/* GET email page. */
const contact = (req, res) => {
    res.render('contact', { title: 'Contact us' })
}

/* POST email form request */
const postEmail = async (req, res) => {
    // Collecting required information from the Request Body
    const { name, email, message } = req.body
    try {
        // Sending the email
        //await delay(2000)
        await mailSender.sendContactEmail({ to: email, name, message })
        res.status(200)
            .json({
                message: 'Email sent successfully',
                data: { name, email, message },
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(400)
            .json({
                message: 'Unable to process request',
                data: {},
                success: false,
            })
    }

}

function delay(time) {
    //return setTimeout(resolve, time)
    return new Promise(resolve => setTimeout(resolve, time))
}

module.exports = {
    contact,
    postEmail
}
