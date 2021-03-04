import dotenv from "dotenv"
dotenv.config()
import Hapi, { Server, ServerOptions } from "@hapi/hapi"

export const makeServer = async ({ port }: ServerOptions) => {
  const server = Hapi.server({
    port,
    host: "localhost",
  })

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!"
    },
  })

  server.route({
    method: "POST",
    path: "/test",
    handler: (req, h) => {
      return req.payload
    },
  })

  process.on("unhandledRejection", (err) => {
    console.log(err)
    process.exit(1)
  })

  return server
}

export const init = async (server: Server) => {
  await server.initialize()
  return server
}

export const start = async (server: Server) => {
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
  return server
}
