import { ApolloServer, gql } from 'apollo-server-express';
import fs from 'fs'
import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { User } from './db.js';
//We need to add ".js" because that's required by Node.js when importing local modules
import { resolvers } from './resolvers.js'


const PORT = 9000;
const JWT_SECRET = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');


const typeDefs =  gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8'}))

async function startApolloServer(typeDefs, resolvers) {
  const context =  async ({req}) => {
    if(req.auth) {
     const user = await User.findById(req.auth.sub);
     return { user };
    }
    return {};
  }
  const server = new ApolloServer({typeDefs, resolvers, context});
const app = express();
app.use(cors(), express.json(), expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret: JWT_SECRET,
}));
await server.start();
/* At this point we need to plug apollo server into our express application.
The way to do this is to call the applyMiddleware like seen below.
This method takes an object where we can pass our Express "app". This
will expose the GraphQL server as part of the Express server. Optionally we 
can set a path here where we want to receive GraphQL requests. This way any
HTTP request sent to /"graphql" will be routed by the Express framework to
the ApolloServer middleware.*/
server.applyMiddleware({app, path: '/graphql'});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne((user) => user.email === email);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });  
  } else {
    res.sendStatus(401);
  }
});

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log( `GraphQL endpoint: http://localhost:${PORT}/graphql`);
});

}

startApolloServer(typeDefs, resolvers);
