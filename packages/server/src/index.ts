import db from '@utilities/connectToDB';
import app from 'src/app';

const initServer = (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  db(mongoURI);
  const port = process.env.PORT || 8080;
  app.listen(port);
};

initServer();

export default initServer;
