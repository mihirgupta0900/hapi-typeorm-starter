import { createConnection, getRepository } from "typeorm"
import Contact from "./db/entity/Profile"
import { makeServer, start } from "./server"

createConnection()
  .then(async (conn) => {
    console.log(`Is connected to DB?: ${conn.isConnected}`)
    const server = await makeServer({ port: process.env.PORT })
    await start(server)
  })
  .catch((e) => console.log(e))
