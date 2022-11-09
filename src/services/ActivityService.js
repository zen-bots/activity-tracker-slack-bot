const pool = require('../db/instance') // Db Instance

class ActivityService {
    /**
     * @description Create an instance of ActivityService
     */
    constructor() { }

    /**
     * @description Attempt to create a activity with the provided object
     * @param activityToCreate {object} Object containing all required fields to
     * create activity
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async create(activityToCreate) {
        try {
            //await pool.query('INSERT INTO activity(slack_id, name) VALUES($1, $2)', [activityToCreate.slackId, activityToCreate.name])
            //return { success: true, body: await get(activityToCreate.slackId) }
        } catch (err) {
            // Don't do anything here because we're inserting even existing activitys.
            //return { success: false, error: err }
        }
        return await this.get(activityToCreate.slackId)
    }

    /**
     * @description Attempt to get a activity with the provided object
     * @param name {object} Object containing all required fields to
     * get activity
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async get(name) {
        try {
            const result = await pool.query('SELECT * FROM activity WHERE name=$1 LIMIT 1', [name])
            return result.rows[0]
            //return { success: true, body: result.rows[0] }
        } catch (err) {
            return { success: false, error: err }
        }
    }
}

module.exports = ActivityService;