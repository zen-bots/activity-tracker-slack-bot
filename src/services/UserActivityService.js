const pool = require('../db/instance') // Db Instance

class UserActivityService {
    /**
     * @description Create an instance of UserActivityService
     */
    constructor() { }

    /**
     * @description Attempt to create a userActivity with the provided object
     * @param userActivityToCreate {object} Object containing all required fields to
     * create userActivity
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async create(userActivityToCreate) {
        try {
            pool.query('INSERT INTO user_activity(user_id, activity_id, point, created_on) VALUES($1, $2, $3, $4)',
                [userActivityToCreate.userId, userActivityToCreate.activityId,
                userActivityToCreate.point, userActivityToCreate.createdOn])
            //return { success: true, body: await get(userActivityToCreate.slackId) }
        } catch (err) {
            //return { success: false, error: err }
        }
    }

    /**
     * @description Attempt to get most active activities of users with the provided object
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async getLeaderboard() {
        try {
            const result = await pool.query("SELECT u.name AS User, a.name AS Activity, sub.point AS Point FROM ( SELECT ua.user_id, ua.activity_id, SUM(ua.point) AS point FROM user_activity ua GROUP BY ua.user_id, ua.activity_id ORDER BY SUM(ua.point) DESC ) AS sub INNER JOIN users u ON sub.user_id = u.id INNER JOIN activity a ON sub.activity_id = a.id LIMIT 3")
            //const result = await pool.query("SELECT u.name AS User, a.name AS Activity, sub.point AS Point FROM ( SELECT ua.user_id, ua.activity_id, SUM(ua.point) AS point FROM user_activity ua WHERE ua.created_on >= (NOW() - interval '1 hour') GROUP BY ua.user_id, ua.activity_id ORDER BY SUM(ua.point) DESC ) AS sub INNER JOIN users u ON sub.user_id = u.id INNER JOIN activity a ON sub.activity_id = a.id LIMIT 3")
            let resultText = ''
            for (var i = 0; i < result.rows.length; i++) {
                if (i == 0) {
                    resultText = resultText + '   User     Activity  Point\n'
                }
                resultText = resultText + ((i + 1) + '- ' + result.rows[i].user + ' ' + result.rows[i].activity + ' ' + result.rows[i].point + '\n')
            }
            console.log(resultText)
            return resultText
            //return { success: true, body: result.rows[0] }
        } catch (err) {
            console.log(err.message)
            return { success: false, error: err }
        }
    }

    /**
     * @description Attempt to get most active activities of users with the provided object
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async getMostActiveActivitiesOfUsers() {
        try {
            const result = await pool.query("SELECT user_id, activity_id, cnt, u.name, a.name AS activity_name FROM (SELECT  user_id, activity_id, cnt, RANK() OVER (PARTITION BY user_id ORDER BY cnt DESC) AS rn FROM ( SELECT user_id, activity_id, COUNT(activity_id) AS cnt FROM user_activity GROUP BY user_id, activity_id) t) s INNER JOIN users u ON s.user_id = u.id INNER JOIN activity a ON s.activity_id = a.id WHERE s.rn = 1 ORDER BY cnt DESC")
            //const result = await pool.query("SELECT DISTINCT ON (user_id) user_id, activity_id, cnt, u.name, a.name AS activity_name FROM (SELECT  user_id, activity_id, cnt, RANK() OVER (PARTITION BY user_id ORDER BY cnt DESC) AS rn FROM ( SELECT user_id, activity_id, COUNT(activity_id) AS cnt FROM user_activity WHERE created_on >= (NOW() - interval '1 hour') GROUP BY user_id, activity_id) t) s INNER JOIN users u ON s.user_id = u.id INNER JOIN activity a ON s.activity_id = a.id WHERE s.rn = 1")
            let resultText = ''
            for (var i = 0; i < result.rows.length; i++) {
                if (i == 0) {
                    resultText = resultText + '\n\n\n User  Activity - Count \n\n';
                }
                resultText = resultText + result.rows[i].name + '  ' + result.rows[i].activity_name + ' - ' + result.rows[i].cnt + '\n';
            }
            console.log(resultText)
            return resultText
            //return { success: true, body: result.rows[0] }
        } catch (err) {
            console.log(err.message)
            return { success: false, error: err }
        }
    }
}

module.exports = UserActivityService;