const pool = require('../db/instance') // Db Instance

class UserService {
    /**
     * @description Create an instance of UserService
     */
    constructor() { }

    /**
     * @description Attempt to create a user with the provided object
     * @param userToCreate {object} Object containing all required fields to
     * create user
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async create(userToCreate) {
        try {
            await pool.query('INSERT INTO users(slack_id, name) VALUES($1, $2)', [userToCreate.slackId, userToCreate.name])
            //return { success: true, body: await get(userToCreate.slackId) }
        } catch (err) {
            // Don't do anything here because we're inserting even existing users.
            //return { success: false, error: err }
        }
        return await this.get(userToCreate.slackId)
    }

    /**
     * @description Attempt to get a user with the provided object
     * @param slackId {object} Object containing all required fields to
     * get user
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async get(slackId) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE slack_id=$1 LIMIT 1', [slackId])
            return result.rows[0]
            //return { success: true, body: result.rows[0] }
        } catch (err) {
            return { success: false, error: err }
        }
    }
}

module.exports = UserService;