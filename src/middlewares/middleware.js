import nextConnect from 'next-connect';
import { MongoClient } from 'mongodb';

const middleware = nextConnect();

async function database(req, res, next) {
  console.log(process.env.MONGODB_URI)
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    if (!client.isConnected()) {
        return client.connect().then(() => {
          req.dbClient = client;
          req.db = client.db(process.env.DB_NAME);
          return next();
        });
      }
    req.dbClient = client;
    req.db = client.db(process.env.DB_NAME);
    return next();
}

middleware.use(database);

export default middleware;
