const pool = require('../db/instance')
const handleResponse = require('../helpers/responseHandler')
const UserService = require("../services/UserService");
const ActivityService = require("../services/ActivityService");
const UserActivityService = require("../services/UserActivityService");
const UserServiceInstance = new UserService();
const ActivityServiceInstance = new ActivityService();
const UserActivityServiceInstance = new UserActivityService();

// save activity
const save = async (req, res) => {
    /*
   return res.status(200).json({
       text: 'Wow!',
       attachments: [handleResponse(await fresh())]
   })
   */

    const { command, user_id, user_name } = req.body;
    const { time } = res.locals;

    console.log('We are running.')
    const [user, activity] = await Promise.all([UserServiceInstance.create({ slackId: user_id, name: user_name }), ActivityServiceInstance.get(command)])
    if (user && activity) {
        UserActivityServiceInstance.create({ userId: user.id, activityId: activity.id, point: (time * activity.multiplication_factor), createdOn: new Date() })
        console.log('user && activity')
        return res.status(200).json({
            text: 'Your activity time saved successfully !',
            attachments: [handleResponse('Recorded!')]
        })
    }
    console.log('insertNewActivity: User and/or activity not found!')
    return user && user.constructor === Error ? user.message : 'User and/or activity not found!'

}

// get leaderboard 
const leaderboard = async (req, res) => {
    console.log('Leaderboard')
    let leaderBoard = await UserActivityServiceInstance.getLeaderboard()
    return res.status(200)
        .json({
            response_type: 'in_channel',
            text: '----- Top 3 -----',
            attachments: [handleResponse(leaderBoard)]
        })
}

// get mostActiveActivityOfUser 
const mostActiveActivityOfUser = async (req, res) => {
    console.log('MostActiveActivityOfUser')
    let leaderBoard = await UserActivityServiceInstance.getMostActiveActivitiesOfUsers()
    return res.status(200)
        .json({
            response_type: 'in_channel',
            text: '----- Most Active Activities Of User -----',
            attachments: [handleResponse(leaderBoard)]
        })
}

const fresh = async () => {
    try {
        pool.query("TRUNCATE user_activity, users RESTART IDENTITY;")
        return 'You deleted everything.'
    }
    catch (error) {
        console.log(error.message)
        return new Error(error.message)
    }
}

module.exports = {
    save,
    leaderboard,
    mostActiveActivityOfUser
}