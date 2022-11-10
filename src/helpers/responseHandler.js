const error = (error) => ({
    color: 'danger',
    text: `*Error*:\n${error.message}`,
    mrkdwn_in: ['text']
})

const success = (message) => ({
    color: 'good',
    text: `${message}`,
    mrkdwn_in: ['text']
})

const handleResponse = (result) => {
    if (result.constructor === Error) {
        return error(result ? result : { message: "Result failed!" });
    }
    return success(result);
}

module.exports = handleResponse