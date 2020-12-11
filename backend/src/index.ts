/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable template-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server'

// Load schema from an external file (relative to build directory).
const schema = fs.readFileSync(path.join(__dirname, '', 'schema.graphql'))
const typeDefs = gql`${schema}`

// Define resolvers to load
const resolvers = {
  Query: {
    hello: () => 'Hello, world!'
  },

  Mutation: {
    echo: (parent: any, params: { input: any }, context: any, info: any) => `You typed ${ params.input }`
  }
}

async function start (): Promise<void> {
  // Start the server
  const server = new ApolloServer({ typeDefs, resolvers })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start()
