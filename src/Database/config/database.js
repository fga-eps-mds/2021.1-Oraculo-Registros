require("dotenv").config();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

module.exports = {
    username: `${DB_USER}`,
    password: `${DB_PASS}`,
    database: `${DB_NAME}`,
    port: 5432,
    dialect: "postgres",
    host: `${DB_HOST}`, //Number.parseInt(`${DB_HOST}`),
    define: {
        timestamps: true,
        underscored: true,
    },
};
