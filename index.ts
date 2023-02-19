import * as dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { engine } from "express-handlebars";
import { ApolloServerContext } from "./interfaces/apollo.interface";
import * as path from "path";
import { fileURLToPath } from "url";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));

// Apollo server setup
const httpServer = http.createServer(app);
const graphqlServer = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await graphqlServer.start();

app.use(`/graphql`, cors<cors.CorsRequest>(), expressMiddleware(graphqlServer, {
  context: async ({ req }) => ({ token: req.headers.token }),
}))

app.engine("hbs", engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", 'hbs');
app.set("views", './views');

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: "0xAds campaign"});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "an error occured",
    error: err.name
  });
});

const PORT = process.env.PORT || 3000;
await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);