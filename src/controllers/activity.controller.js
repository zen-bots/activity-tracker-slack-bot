const { Pool } = require('pg')
const handleResponse = require('../responseHandler');

// connect to postgre database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        require: process.env.DATABASE_URL ? true : false,
        rejectUnauthorized: false
    }
})

// save activity
const save = async (req, res) => {
     /*
    return res.status(200).json({
        text: 'Wow!',
        attachments: [handleResponse(await fresh())]
    })
    */
    
    const { body } = req
    const { command, user_id, user_name } = body;
    const { time } = res.locals;

    console.log('We are running.')
    const [user, activity] = await Promise.all([insertUser(user_id, user_name), getActivityByCommand(command)])
    if (user && activity) {
        insertUserActivity(user.id, activity.id, (time * activity.multiplication_factor), new Date())
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
    let leaderBoard = await getLeaderboard()
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
    let leaderBoard = await getMostActiveActivityOfUser()
    return res.status(200)
        .json({
            response_type: 'in_channel',
            text: '----- Most Active Activities Of User -----',
            attachments: [handleResponse(leaderBoard)]
        })
}

// #region User Methods
const getUserBySlackId = async (slack_id) => {
    try {
        const response = await pool.query('SELECT * FROM users WHERE slack_id=$1 LIMIT 1', [slack_id])
        return response.rows[0]
    }
    catch (error) {
        console.log(error.message)
        return new Error(error.message)
    }
};

const insertUser = async (slack_id, name) => {
    try {
        await pool.query('INSERT INTO users(slack_id, name) VALUES($1, $2)', [slack_id, name])
    } catch (error) { }
    return await getUserBySlackId(slack_id)
};
//#endregion

// #region Activity Methods
const getActivityByCommand = async (command) => {
    try {
        const response = await pool.query('SELECT * FROM activity WHERE name=$1 LIMIT 1', [command])
        return response.rows[0]
    }
    catch (error) {
        console.log(error.message)
        return new Error(error.message)
    }
}
//#endregion

// #region User Activity Methods
const insertUserActivity = async (user_id, activity_id, point, created_on) => {
    const response = await pool.query('INSERT INTO user_activity(user_id, activity_id, point, created_on) VALUES($1, $2, $3, $4)',
        [user_id, activity_id, point, created_on])
}
//#endregion

const getLeaderboard = async () => {
    try {
        const response = await pool.query("SELECT u.name AS User, a.name AS Activity, sub.point AS Point FROM ( SELECT ua.user_id, ua.activity_id, SUM(ua.point) AS point FROM user_activity ua GROUP BY ua.user_id, ua.activity_id ORDER BY SUM(ua.point) DESC ) AS sub INNER JOIN users u ON sub.user_id = u.id INNER JOIN activity a ON sub.activity_id = a.id LIMIT 3")
        //const response = await pool.query("SELECT u.name AS User, a.name AS Activity, sub.point AS Point FROM ( SELECT ua.user_id, ua.activity_id, SUM(ua.point) AS point FROM user_activity ua WHERE ua.created_on >= (NOW() - interval '1 hour') GROUP BY ua.user_id, ua.activity_id ORDER BY SUM(ua.point) DESC ) AS sub INNER JOIN users u ON sub.user_id = u.id INNER JOIN activity a ON sub.activity_id = a.id LIMIT 3")
        let resultText = ''
        for (i = 0; i < response.rows.length; i++) {
            if (i == 0) {
                resultText = resultText + '   User     Activity  Point\n'
            }
            resultText = resultText + ((i + 1) + '- ' + response.rows[i].user + ' ' + response.rows[i].activity + ' ' + response.rows[i].point + '\n')
        }
        console.log(resultText)
        return resultText
    }
    catch (error) {
        console.log(error.message)
        return new Error(error.message)
    }
}

const getMostActiveActivityOfUser = async () => {
    try {
        const response = await pool.query("SELECT user_id, activity_id, cnt, u.name, a.name AS activity_name FROM (SELECT  user_id, activity_id, cnt, RANK() OVER (PARTITION BY user_id ORDER BY cnt DESC) AS rn FROM ( SELECT user_id, activity_id, COUNT(activity_id) AS cnt FROM user_activity GROUP BY user_id, activity_id) t) s INNER JOIN users u ON s.user_id = u.id INNER JOIN activity a ON s.activity_id = a.id WHERE s.rn = 1 ORDER BY cnt DESC")
        //const response = await pool.query("SELECT DISTINCT ON (user_id) user_id, activity_id, cnt, u.name, a.name AS activity_name FROM (SELECT  user_id, activity_id, cnt, RANK() OVER (PARTITION BY user_id ORDER BY cnt DESC) AS rn FROM ( SELECT user_id, activity_id, COUNT(activity_id) AS cnt FROM user_activity WHERE created_on >= (NOW() - interval '1 hour') GROUP BY user_id, activity_id) t) s INNER JOIN users u ON s.user_id = u.id INNER JOIN activity a ON s.activity_id = a.id WHERE s.rn = 1")
        let resultText = ''
        for (i = 0; i < response.rows.length; i++) {
            if (i == 0) {
                resultText = resultText + '\n\n\n User  Activity - Count \n\n';
            }
            resultText = resultText + response.rows[i].name + '  ' + response.rows[i].activity_name + ' - ' + response.rows[i].cnt + '\n';
        }
        console.log(resultText)
        return resultText
    }
    catch (error) {
        console.log(error.message)
        return new Error(error.message)
    }
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