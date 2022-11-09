module.exports = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        require: process.env.DATABASE_URL ? true : false,
        rejectUnauthorized: false
    },
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};