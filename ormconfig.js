require("dotenv").config()
const { DATABASE_URI, CONNECTION_LIMIT, TEST_DATABASE_URI, TEST } = process.env
const parse = require("pg-connection-string").parse

const config = parse(
  TEST === "1" ? TEST_DATABASE_URI : DATABASE_URI
)
const { host, password, database, port, user } = config

const isTsNode = !!process.argv.find((val) => val.includes("ts-node"))

if (TEST === "1") {
  console.log(`Using test SQL URI`)
}

module.exports = {
  type: "postgres",
  host: host,
  port: port || 5432,
  username: user,
  password: password,
  database: database,
  // synchronize: TEST === "1",
  logging: TEST === "1",
  entities: [__dirname + "/src/db/entity/*.ts"],
  migrations: [isTsNode ? "src/db/migrations/*.ts" : "dist/db/migrations/*.js"],
  cli: {
    migrationsDir: "./src/db/migrations",
  },
  extra: {
    connectionLimit: CONNECTION_LIMIT ? parseInt(CONNECTION_LIMIT) : 5,
  },
}
